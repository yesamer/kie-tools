/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { I18n } from "@kogito-tooling/i18n/dist/core/I18n";
import * as vscode from "vscode";
import { CapabilityResponseStatus } from "../../api";
import { ServiceId } from "../../channel-api";
import { QuarkusDevRunnerCapability } from "../../channel-api/capability/quarkusDevRunner/QuarkusDevRunnerCapability";
import { BackendI18n } from "../../i18n";
import { SimpleURLWebView } from "../SimpleIFrameWebview";
import { VsCodeBackendProxy } from "../VsCodeBackendProxy";

// Move to i18n
const startUpQuarkusDev = "Starting up Quarkus dev. This might take a while.";
const startedUp = "Quarkus dev started up";
const openForm = "Open Demo System";

export function registerQuarkusDevRunnerCommand(args: {
  command: string;
  context: vscode.ExtensionContext;
  backendProxy: VsCodeBackendProxy;
  backendI18n: I18n<BackendI18n>;
  urlWebview: SimpleURLWebView;
}) {
  args.context.subscriptions.push(
    vscode.commands.registerCommand(args.command, () => run(args.backendProxy, args.urlWebview, args.backendI18n))
  );
}

async function run(backendProxy: VsCodeBackendProxy, urlWebview: SimpleURLWebView, backendI18n: I18n<BackendI18n>) {
  try {
    const response = await backendProxy.withCapability(
      ServiceId.QUARKUS_DEV_RUNNER,
      async (capability: QuarkusDevRunnerCapability) =>
        vscode.window.withProgress(
          { location: vscode.ProgressLocation.Notification, title: startUpQuarkusDev, cancellable: true },
          (_, token) => {
            token.onCancellationRequested(() => {
              capability.stopEngine();
            });

            return capability.startEngine();
          }
        )
    );

    if (response.status === CapabilityResponseStatus.MISSING_INFRA) {
      return;
    }

    if (response.status === CapabilityResponseStatus.NOT_AVAILABLE) {
      vscode.window.showWarningMessage(response.message!);
      return;
    }

    const selection = await vscode.window.showInformationMessage(startedUp, openForm);
    if (!selection) {
      return;
    }

    urlWebview.open("pageId", "Demo system", response.body + "/webjars/openapi-as-reactforms/index.html");
  } catch (e) {
    vscode.window.showErrorMessage(e);
  }
}
