/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as cp from "child_process";
import * as fs from "fs";
import * as path from "path";
import { getPortPromise } from "portfinder";
import { CapabilityResponse, Service } from "../api";
import { ServiceId } from "../channel-api";
import { QuarkusDevRunnerCapability } from "../channel-api/capability/quarkusDevRunner/QuarkusDevRunnerCapability";
import * as utils from "./utils";

export class QuarkusDevRunnerService implements Service, QuarkusDevRunnerCapability {
  private activeProcess: cp.ChildProcess | undefined;

  public constructor(private readonly baseDir?: string) {}

  public identify(): string {
    return ServiceId.QUARKUS_DEV_RUNNER;
  }

  public async start(): Promise<void> {
    /* Nothing to do here */
  }

  public stop(): void {
    if (!this.activeProcess) {
      return;
    }

    utils.killProcess(this.activeProcess);
    this.activeProcess = undefined;
  }

  public async satisfyRequirements(): Promise<boolean> {
    if (!this.baseDir || !fs.existsSync(this.baseDir)) {
      console.error(`Unable to resolve the provided path: ${this.baseDir}`);
      return false;
    }

    if (!(await utils.isMavenAvailable({ major: 3, minor: 6, patch: 2 }))) {
      console.error("Maven 3.6.2+ could not be identified.");
      return false;
    }

    if (!(await utils.isJavaAvailable({ major: 11, minor: 0, patch: 0 }))) {
      console.error("Java 11.0.0+ could not be identified.");
      return false;
    }

    return true;
  }

  public stopEngine() {
    this.stop();
  }

  public async startEngine(): Promise<CapabilityResponse<string>> {
    this.stop();

    if (!fs.existsSync(path.join(this.baseDir!, "pom.xml"))) {
      return Promise.reject(`Unable to find a pom.xml file inside ${this.baseDir}`);
    }

    let port: number;
    try {
      port = await getPortPromise({ port: 8082 });
    } catch (e) {
      console.error(e);
      return Promise.reject("Unable to find an available port.");
    }

    this.activeProcess = cp.spawn("mvn", [
      "clean",
      "compile",
      "quarkus:dev",
      `-Dquarkus.http.port=${port}`,
      "-f",
      this.baseDir!
    ]);

    const timeoutPromise = new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(false);
      }, 10 * 60 * 1000);
    });

    const checkServerPromise = new Promise<boolean>(resolve => {
      if (!this.activeProcess || !this.activeProcess.stdout) {
        resolve(false);
        return;
      }

      this.activeProcess.stdout.on("data", data => {
        const output = data.toString();
        if (output.includes("Listening on")) {
          resolve(true);
        }

        if (output.includes("Failed to start quarkus") || output.includes("ERROR")) {
          resolve(false);
        }
      });
    });

    return Promise.race([timeoutPromise, checkServerPromise]).then(result => {
      if (!result) {
        this.stop();
        return Promise.reject("Could not start up Quarkus dev. Please verify your project and try again.");
      }

      return CapabilityResponse.ok(`http://localhost:${port}`);
    });
  }
}
