/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { basename } from "path";
import {
  SceSim__FactMappingType,
  SceSim__FactMappingValuesTypes,
  SceSim__settingsType,
} from "@kie-tools/scesim-marshaller/dist/schemas/scesim-1_8/ts-gen/types";
import { ExternalDmn } from "../TestScenarioEditor";

export function createNewDmnTypeTestScenario({
  dmnModel,
  factMappings,
  factMappingValues,
  isAutoFillTableEnabled,
  isTestSkipped,
  settingsModel,
}: {
  dmnModel: ExternalDmn;
  factMappings: SceSim__FactMappingType[];
  factMappingValues: SceSim__FactMappingValuesTypes[];
  isAutoFillTableEnabled: boolean;
  isTestSkipped: boolean;
  settingsModel: SceSim__settingsType;
}) {
  settingsModel.dmnFilePath = { __$$text: dmnModel.normalizedPosixPathRelativeToTheOpenFile };
  settingsModel.dmnName = { __$$text: basename(dmnModel.normalizedPosixPathRelativeToTheOpenFile) };
  settingsModel.dmnNamespace = { __$$text: dmnModel.model.definitions["@_namespace"] };
  settingsModel.skipFromBuild = { __$$text: isTestSkipped };
  settingsModel.type = { __$$text: "DMN" };

  if (isAutoFillTableEnabled) {
    console.log();
  } else {
    console.log();
  }
}
