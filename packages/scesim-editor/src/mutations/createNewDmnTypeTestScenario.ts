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
import { pushFactMappings } from "./pushFactMappings";
import {
  DMN15__tDecision,
  DMN15__tInputData,
  DMN15__tItemDefinition,
} from "@kie-tools/dmn-marshaller/dist/schemas/dmn-1_5/ts-gen/types";

const EMPTY_GIVEN_FACTMAPPING = {
  className: "java.lang.Void",
  columnWidth: 300,
  expressionAlias: "PROPERTY-1",
  expressionElements: [],
  expressionIdentifierType: "GIVEN",
  factAlias: "INSTANCE-1",
  factIdentifierName: "INSTANCE-1",
  factIdentifierClassName: "java.lang.Void",
};

const EMPTY_EXPECT_FACTMAPPING = {
  className: "java.lang.Void",
  columnWidth: 300,
  expressionAlias: "PROPERTY-2",
  expressionElements: [],
  expressionIdentifierType: "EXPECT",
  factAlias: "INSTANCE-2",
  factIdentifierName: "INSTANCE-2",
  factIdentifierClassName: "java.lang.Void",
};

type FactMapping = {
  className: string;
  columnWidth: number;
  expressionAlias: string;
  expressionElements: string[];
  expressionIdentifierType: string;
  factAlias: string;
  factIdentifierName: string;
  factIdentifierClassName: string;
};

export function createNewDmnTypeTestScenario({
  dmnModel,
  factMappingsModel,
  factMappingValuesModel,
  isAutoFillTableEnabled,
  isTestSkipped,
  settingsModel,
}: {
  dmnModel: ExternalDmn;
  factMappingsModel: SceSim__FactMappingType[];
  factMappingValuesModel: SceSim__FactMappingValuesTypes[];
  isAutoFillTableEnabled: boolean;
  isTestSkipped: boolean;
  settingsModel: SceSim__settingsType;
}) {
  settingsModel.dmnFilePath = { __$$text: dmnModel.normalizedPosixPathRelativeToTheOpenFile };
  settingsModel.dmnName = { __$$text: basename(dmnModel.normalizedPosixPathRelativeToTheOpenFile) };
  settingsModel.dmnNamespace = { __$$text: dmnModel.model.definitions["@_namespace"] };
  settingsModel.skipFromBuild = { __$$text: isTestSkipped };
  settingsModel.type = { __$$text: "DMN" };

  const givenFactMappingsToPush = [] as FactMapping[];
  const expectFactMappingsToPush = [] as FactMapping[];

  if (isAutoFillTableEnabled && dmnModel.model.definitions.drgElement) {
    const itemDefinitions = dmnModel.model.definitions.itemDefinition!;
    const itemDefinitionMap = new Map(
      itemDefinitions.map((itemDefinition) => [itemDefinition["@_name"], itemDefinition] as const)
    );

    const inputDataElements = dmnModel.model.definitions.drgElement
      .filter((drgElement) => drgElement.__$$element === "inputData")
      .map((drgElement) => drgElement as DMN15__tInputData);
    const decisionElements = dmnModel.model.definitions.drgElement
      .filter((drgElement) => drgElement.__$$element === "decision")
      .map((drgElement) => drgElement as DMN15__tDecision);

    inputDataElements.forEach((inputDataElement) => {
      if (isSimpleType(inputDataElement.variable!["@_typeRef"]!)) {
        givenFactMappingsToPush.push(
          generateSimpleTypeFactMapping(
            inputDataElement.variable!["@_typeRef"]!,
            100,
            [inputDataElement.variable!["@_name"]!],
            "GIVEN",
            inputDataElement.variable!["@_name"]!,
            inputDataElement.variable!["@_typeRef"]!
          )
        );
      } else {
        const itemDefinition = itemDefinitionMap.get(inputDataElement.variable!["@_typeRef"]!);
        if (itemDefinition?.typeRef && isSimpleType(itemDefinition?.typeRef?.__$$text)) {
          generateSimpleTypeFactMapping(
            itemDefinition?.typeRef?.__$$text,
            100,
            [inputDataElement.variable!["@_name"]!],
            "EXPECT",
            inputDataElement.variable!["@_name"]!,
            inputDataElement.variable!["@_typeRef"]!
          );
        } else {
          itemDefinition?.itemComponent!.forEach((itemComponent) => {
            recursevlyNavigateItemComponent(
              100,
              givenFactMappingsToPush,
              [inputDataElement.variable!["@_name"]!],
              "GIVEN",
              itemComponent,
              inputDataElement.variable!["@_name"]!,
              inputDataElement.variable!["@_typeRef"]!
            );
          });
        }
      }
    });

    decisionElements.forEach((decisionDataElement) => {
      if (isSimpleType(decisionDataElement.variable!["@_typeRef"]!)) {
        givenFactMappingsToPush.push(
          generateSimpleTypeFactMapping(
            decisionDataElement.variable!["@_typeRef"]!,
            100,
            [decisionDataElement.variable!["@_name"]!],
            "EXPECT",
            decisionDataElement.variable!["@_name"]!,
            decisionDataElement.variable!["@_typeRef"]!
          )
        );
      } else {
        const itemDefinition = itemDefinitionMap.get(decisionDataElement.variable!["@_typeRef"]!);
        if (itemDefinition?.typeRef && isSimpleType(itemDefinition?.typeRef?.__$$text)) {
          generateSimpleTypeFactMapping(
            itemDefinition?.typeRef?.__$$text,
            100,
            [decisionDataElement.variable!["@_name"]!],
            "EXPECT",
            decisionDataElement.variable!["@_name"]!,
            decisionDataElement.variable!["@_typeRef"]!
          );
        } else {
          itemDefinition?.itemComponent!.forEach((itemComponent) => {
            recursevlyNavigateItemComponent(
              100,
              expectFactMappingsToPush,
              [decisionDataElement.variable!["@_name"]!],
              "EXPECT",
              itemComponent,
              decisionDataElement.variable!["@_name"]!,
              decisionDataElement.variable!["@_typeRef"]!
            );
          });
        }
      }
    });
  }

  if (givenFactMappingsToPush.length === 0) {
    givenFactMappingsToPush.push(EMPTY_GIVEN_FACTMAPPING);
  }

  if (expectFactMappingsToPush.length === 0) {
    expectFactMappingsToPush.push(EMPTY_EXPECT_FACTMAPPING);
  }

  pushFactMappings({
    factMappingsModel,
    factMappingValuesModel,
    factMappingsToPush: [...givenFactMappingsToPush, ...expectFactMappingsToPush],
  });
}

function isSimpleType(type: string) {
  return [
    "Any",
    "boolean",
    "context",
    "date",
    "date and time",
    "days and time duration",
    "number",
    "string",
    "time",
    "years and months duration",
    "<Undefined>",
  ].includes(type);
}

function generateSimpleTypeFactMapping(
  className: string,
  columnWidth: number,
  expressionElements: string[],
  expressionIdentifierType: "EXPECT" | "GIVEN",
  name: string,
  typeRef: string
) {
  return {
    className,
    columnWidth,
    expressionAlias: "value",
    expressionElements: expressionElements,
    expressionIdentifierType,
    factAlias: name,
    factIdentifierName: name,
    factIdentifierClassName: typeRef,
  };
}

function recursevlyNavigateItemComponent(
  columnWidth: number,
  factMappingsToReturn: FactMapping[],
  expressionElements: string[],
  expressionIdentifierType: "EXPECT" | "GIVEN",
  itemComponent: DMN15__tItemDefinition,
  name: string,
  typeRef: string
) {
  if (!itemComponent.typeRef && itemComponent.itemComponent) {
    itemComponent.itemComponent.forEach((nestedItemComponent) => {
      recursevlyNavigateItemComponent(
        columnWidth,
        factMappingsToReturn,
        [...expressionElements, itemComponent["@_name"]],
        expressionIdentifierType,
        nestedItemComponent,
        name,
        typeRef
      );
    });
  } else {
    factMappingsToReturn.push({
      className: itemComponent.typeRef!.__$$text,
      columnWidth: columnWidth,
      expressionAlias: [...expressionElements.slice(1), itemComponent["@_name"]].join("."),
      expressionElements: [...expressionElements, itemComponent["@_name"]],
      expressionIdentifierType: expressionIdentifierType,
      factAlias: name,
      factIdentifierName: name,
      factIdentifierClassName: typeRef,
    });
  }
}
