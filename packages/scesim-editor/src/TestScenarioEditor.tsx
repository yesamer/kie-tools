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

import "@patternfly/react-core/dist/styles/base.css";

import * as React from "react";
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

import { I18nDictionariesProvider } from "@kie-tools-core/i18n/dist/react-components";

import { testScenarioEditorDictionaries, TestScenarioEditorI18nContext, testScenarioEditorI18nDefaults } from "./i18n";

import { SceSimModel } from "@kie-tools/scesim-marshaller";
import {
  SceSim__FactMappingType,
  SceSim__ScenarioSimulationModelType,
  SceSim__settingsType,
} from "@kie-tools/scesim-marshaller/dist/schemas/scesim-1_8/ts-gen/types";

import { Alert } from "@patternfly/react-core/dist/js/components/Alert";
import { Bullseye } from "@patternfly/react-core/dist/js/layouts/Bullseye";
import { Drawer, DrawerContent, DrawerContentBody } from "@patternfly/react-core/dist/js/components/Drawer";
import { EmptyState, EmptyStateBody, EmptyStateIcon } from "@patternfly/react-core/dist/js/components/EmptyState";
import { Icon } from "@patternfly/react-core/dist/js/components/Icon";
import { Spinner } from "@patternfly/react-core/dist/js/components/Spinner";
import { Tabs, Tab, TabTitleIcon, TabTitleText } from "@patternfly/react-core/dist/js/components/Tabs";
import { Title } from "@patternfly/react-core/dist/js/components/Title";
import { Tooltip } from "@patternfly/react-core/dist/js/components/Tooltip";

import ErrorIcon from "@patternfly/react-icons/dist/esm/icons/error-circle-o-icon";
import TableIcon from "@patternfly/react-icons/dist/esm/icons/table-icon";
import HelpIcon from "@patternfly/react-icons/dist/esm/icons/help-icon";

import { ErrorBoundary, ErrorBoundaryPropsWithFallback } from "react-error-boundary";

import TestScenarioCreationPanel from "./creation/TestScenarioCreationPanel";
import TestScenarioDrawerPanel from "./drawer/TestScenarioDrawerPanel";
import TestScenarioSideBarMenu from "./sidebar/TestScenarioSideBarMenu";
import TestScenarioTable from "./table/TestScenarioTable";
import { useTestScenarioEditorI18n } from "./i18n";

import { EMPTY_ONE_EIGHT } from "./resources/EmptyScesimFile";

import "./TestScenarioEditor.css";
import { ComputedStateCache } from "./store/ComputedStateCache";
import { Computed, createTestScenarioEditorStore, TestScenarioEditorTab } from "./store/TestScenarioEditorStore";
import {
  StoreApiType,
  TestScenarioEditorStoreApiContext,
  useTestScenarioEditorStore,
  useTestScenarioEditorStoreApi,
} from "./store/TestScenarioStoreContext";
import { TestScenarioEditorErrorFallback } from "./TestScenarioEditorErrorFallback";
import { TestScenarioEditorContextProvider, useTestScenarioEditor } from "./TestScenarioEditorContext";
import { useEffectAfterFirstRender } from "./hook/useEffectAfterFirstRender";
import { stat } from "fs";

/* Constants */

const CURRENT_SUPPORTED_VERSION = "1.8";

/* Enums */

enum TestScenarioFileStatus {
  EMPTY,
  ERROR,
  NEW,
  UNSUPPORTED,
  VALID,
}

export enum TestScenarioType {
  DMN,
  RULE,
}

/* Types */

export type OnSceSimModelChange = (model: SceSimModel) => void;

export type TestScenarioEditorProps = {
  /**
   * A link that will take users to an issue tracker so they can report problems they find on the Test Scenario Editor.
   * This is shown on the ErrorBoundary fallback component, when an uncaught error happens.
   */
  issueTrackerHref?: string;
  /**
   * The Test Scenario itself.
   */
  model: SceSimModel;
  /**
   * Called when a change occurs on `model`, so the controlled flow of the component can be done.
   */
  onModelChange?: OnSceSimModelChange;
  /**
   * When users want to jump to another file, this method is called, allowing the controller of this component decide what to do.
   * Links are only rendered if this is provided. Otherwise, paths will be rendered as text.
   */
  //onRequestToJumpToPath?: OnRequestToJumpToPath;
  /**
   * All paths inside the Test Scenario Editor are relative. To be able to resolve them and display them as absolute paths, this function is called.
   * If undefined, the relative paths will be displayed.
   */
  //onRequestToResolvePath?: OnRequestToResolvePath;
  /**
   * Notifies the caller when the Test Scenario Editor performs a new edit after the debounce time.
   */
  onModelDebounceStateChanged?: (changed: boolean) => void;
};

export type TestScenarioAlert = {
  enabled: boolean;
  message?: string;
  variant: "success" | "danger" | "warning" | "info" | "default";
};

export type TestScenarioDataObject = {
  id: string;
  children?: TestScenarioDataObject[];
  customBadgeContent?: string;
  isSimpleTypeFact?: boolean;
  name: string;
};

export type TestScenarioEditorRef = {
  reset: (mode: SceSimModel) => void;
  getDiagramSvg: () => Promise<string | undefined>;
};

export type TestScenarioSelectedColumnMetaData = {
  factMapping: SceSim__FactMappingType;
  index: number;
  isBackground: boolean;
};

function TestScenarioMainPanel({
  fileName,
  scesimModel,
  updateTestScenarioModel,
}: {
  fileName: string;
  scesimModel: { ScenarioSimulationModel: SceSim__ScenarioSimulationModelType };
  updateTestScenarioModel?: React.Dispatch<React.SetStateAction<SceSimModel>>;
}) {
  const { i18n } = useTestScenarioEditorI18n();

  const navigation = useTestScenarioEditorStore((s) => s.navigation);
  const testScenarioEditorStoreApi = useTestScenarioEditorStoreApi();

  const [alert, setAlert] = useState<TestScenarioAlert>({ enabled: false, variant: "info" });
  const [dataObjects, setDataObjects] = useState<TestScenarioDataObject[]>([]);
  const [selectedColumnMetadata, setSelectedColumnMetaData] = useState<TestScenarioSelectedColumnMetaData | null>(null);

  const scenarioTableScrollableElementRef = useRef<HTMLDivElement | null>(null);
  const backgroundTableScrollableElementRef = useRef<HTMLDivElement | null>(null);

  const onTabChanged = useCallback(
    (_event, tab) => {
      setSelectedColumnMetaData(null);
      testScenarioEditorStoreApi.setState((state) => {
        state.navigation.tab = tab;
      });
    },
    [testScenarioEditorStoreApi]
  );

  const showDockPanel = useCallback(
    (show: boolean) => {
      testScenarioEditorStoreApi.setState((state) => {
        state.navigation.dock.isOpen = show;
      });
    },
    [testScenarioEditorStoreApi]
  );

  useEffect(() => {
    //setDockPanel({ isOpen: true, selected: TestScenarioEditorDock.DATA_OBJECT });
    setSelectedColumnMetaData(null);
    //setTab(TestScenarioEditorTab.EDITOR);
  }, [fileName]);

  /** This is TEMPORARY */
  useEffect(() => {
    /* To create the Data Object arrays we need an external source, in details: */
    /* DMN Data: Retrieving DMN type from linked DMN file */
    /* Java classes: Retrieving Java classes info from the user projects */
    /* At this time, none of the above are supported */
    /* Therefore, it tries to retrieve these info from the SCESIM file, if are present */

    /* Retriving Data Object from the scesim file.       
       That makes sense for previously created scesim files */

    const factsMappings: SceSim__FactMappingType[] =
      scesimModel.ScenarioSimulationModel.simulation.scesimModelDescriptor.factMappings.FactMapping ?? [];

    const dataObjects: TestScenarioDataObject[] = [];

    /* The first two FactMapping are related to the "Number" and "Description" columns. 
       If those columns only are present, no Data Objects can be detected in the scesim file */
    for (let i = 2; i < factsMappings.length; i++) {
      if (factsMappings[i].className!.__$$text === "java.lang.Void") {
        continue;
      }
      const factID = factsMappings[i].expressionElements!.ExpressionElement![0].step.__$$text;
      const dataObject = dataObjects.find((value) => value.id === factID);
      const isSimpleTypeFact = factsMappings[i].expressionElements!.ExpressionElement!.length == 1;
      const propertyID = isSimpleTypeFact //POTENTIAL BUG
        ? factsMappings[i].expressionElements!.ExpressionElement![0].step.__$$text.concat(".")
        : factsMappings[i]
            .expressionElements!.ExpressionElement!.map((expressionElement) => expressionElement.step.__$$text)
            .join(".");
      const propertyName = isSimpleTypeFact
        ? "value"
        : factsMappings[i].expressionElements!.ExpressionElement!.slice(-1)[0].step.__$$text;
      if (dataObject) {
        if (!dataObject.children?.some((value) => value.id === propertyID)) {
          dataObject.children!.push({
            id: propertyID,
            customBadgeContent: factsMappings[i].className.__$$text,
            isSimpleTypeFact: isSimpleTypeFact,
            name: propertyName,
          });
        }
      } else {
        dataObjects.push({
          id: factID,
          name: factsMappings[i].factAlias!.__$$text,
          customBadgeContent: factsMappings[i].factIdentifier!.className!.__$$text,
          children: [
            {
              id: propertyID,
              name: propertyName,
              customBadgeContent: factsMappings[i].className.__$$text,
            },
          ],
        });
      }
    }

    setDataObjects(dataObjects);
  }, [
    scesimModel.ScenarioSimulationModel.settings.type,
    scesimModel.ScenarioSimulationModel.simulation.scesimModelDescriptor.factMappings.FactMapping,
  ]);

  /** It determines the Alert State */
  useEffect(() => {
    const assetType = scesimModel.ScenarioSimulationModel.settings.type!.__$$text;

    let alertEnabled = false;
    let alertMessage = "";
    let alertVariant: "default" | "danger" | "warning" | "info" | "success" = "danger";

    if (dataObjects.length > 0) {
      alertMessage =
        assetType === TestScenarioType[TestScenarioType.DMN]
          ? i18n.alerts.dmnDataRetrievedFromScesim
          : i18n.alerts.ruleDataRetrievedFromScesim;
      alertEnabled = true;
    } else {
      alertMessage =
        assetType === TestScenarioType[TestScenarioType.DMN]
          ? i18n.alerts.dmnDataNotAvailable
          : i18n.alerts.ruleDataNotAvailable;
      alertVariant = assetType === TestScenarioType[TestScenarioType.DMN] ? "warning" : "danger";
      alertEnabled = true;
    }

    setAlert({ enabled: alertEnabled, message: alertMessage, variant: alertVariant });
  }, [dataObjects, i18n, scesimModel.ScenarioSimulationModel.settings.type]);

  return (
    <>
      <div className="kie-scesim-editor--content">
        <Drawer isExpanded={navigation.dock.isOpen} isInline={true} position={"right"}>
          <DrawerContent
            panelContent={
              <TestScenarioDrawerPanel
                dataObjects={dataObjects}
                fileName={fileName}
                onDrawerClose={() => showDockPanel(false)}
                selectedColumnMetaData={selectedColumnMetadata}
                updateSelectedColumnMetaData={setSelectedColumnMetaData}
                updateTestScenarioModel={updateTestScenarioModel}
              />
            }
          >
            <DrawerContentBody>
              {alert.enabled && (
                <div className="kie-scesim-editor--content-alert">
                  <Alert variant={alert.variant} title={alert.message} />
                </div>
              )}
              <div className="kie-scesim-editor--content-tabs">
                <Tabs isFilled={true} activeKey={navigation.tab} onSelect={onTabChanged} role="region">
                  <Tab
                    eventKey={TestScenarioEditorTab.SCENARIO}
                    title={
                      <>
                        <TabTitleIcon>
                          <TableIcon />
                        </TabTitleIcon>
                        <TabTitleText>{i18n.tab.scenarioTabTitle}</TabTitleText>
                        <Tooltip content={i18n.tab.scenarioTabInfo}>
                          <Icon size="sm" status="info">
                            <HelpIcon />
                          </Icon>
                        </Tooltip>
                      </>
                    }
                  >
                    <div
                      className="kie-scesim-editor--scenario-table-container"
                      ref={scenarioTableScrollableElementRef}
                    >
                      <TestScenarioTable
                        assetType={scesimModel.ScenarioSimulationModel.settings.type!.__$$text}
                        tableData={scesimModel.ScenarioSimulationModel.simulation}
                        scrollableParentRef={scenarioTableScrollableElementRef}
                        updateSelectedColumnMetaData={setSelectedColumnMetaData}
                        updateTestScenarioModel={updateTestScenarioModel}
                      />
                    </div>
                  </Tab>
                  <Tab
                    eventKey={TestScenarioEditorTab.BACKGROUND}
                    title={
                      <>
                        <TabTitleIcon>
                          <TableIcon />
                        </TabTitleIcon>
                        <TabTitleText>{i18n.tab.backgroundTabTitle}</TabTitleText>
                        <Tooltip content={i18n.tab.backgroundTabInfo}>
                          <Icon size="sm" status="info">
                            <HelpIcon />
                          </Icon>
                        </Tooltip>
                      </>
                    }
                  >
                    <div
                      className="kie-scesim-editor--background-table-container"
                      ref={backgroundTableScrollableElementRef}
                    >
                      <TestScenarioTable
                        assetType={scesimModel.ScenarioSimulationModel.settings.type!.__$$text}
                        tableData={scesimModel.ScenarioSimulationModel.background}
                        scrollableParentRef={backgroundTableScrollableElementRef}
                        updateSelectedColumnMetaData={setSelectedColumnMetaData}
                        updateTestScenarioModel={updateTestScenarioModel}
                      />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </div>
      <TestScenarioSideBarMenu />
    </>
  );
}

function TestScenarioParserErrorPanel({
  parserErrorTitle,
  parserErrorMessage,
}: {
  parserErrorTitle: string;
  parserErrorMessage: string;
}) {
  return (
    <EmptyState>
      <EmptyStateIcon icon={ErrorIcon} />
      <Title headingLevel="h4" size="lg">
        {parserErrorTitle}
      </Title>
      <EmptyStateBody>{parserErrorMessage}</EmptyStateBody>
    </EmptyState>
  );
}

export const TestScenarioEditorInternal = ({
  model,
  onModelChange,
  onModelDebounceStateChanged,
  forwardRef,
}: TestScenarioEditorProps & { forwardRef?: React.Ref<TestScenarioEditorRef> }) => {
  console.trace("[TestScenarioEditorInternal] Component creation ... ");

  const scesim = useTestScenarioEditorStore((s) => s.scesim);
  const testScenarioEditorStoreApi = useTestScenarioEditorStoreApi();
  const { testScenarioEditorModelBeforeEditingRef, testScenarioEditorRootElementRef } = useTestScenarioEditor();

  /** Implementing Editor APIs */

  // Allow imperativelly controlling the Editor.
  useImperativeHandle(
    forwardRef,
    () => ({
      reset: (model) => {
        const state = testScenarioEditorStoreApi.getState();
        return state.dispatch(state).scesim.reset(model);
      },
      getDiagramSvg: async () => undefined,
    }),
    [testScenarioEditorStoreApi]
  );

  // Make sure the Test Scenario Editor reacts to props changing.
  useEffectAfterFirstRender(() => {
    testScenarioEditorStoreApi.setState((state) => {
      // Avoid unecessary state updates
      if (model === state.scesim.model) {
        return;
      }

      console.trace("[TestScenarioEditorInternal: model externally updated!");

      state.scesim.model = model;
      testScenarioEditorModelBeforeEditingRef.current = model;
    });
  }, [testScenarioEditorStoreApi, model]);

  // Only notify changes when dragging/resizing operations are not happening.
  useEffectAfterFirstRender(() => {
    onModelDebounceStateChanged?.(false);

    const timeout = setTimeout(() => {
      // Ignore changes made outside... If the controller of the component
      // changed its props, it knows it already, we don't need to call "onModelChange" again.
      if (model === scesim.model) {
        return;
      }

      onModelDebounceStateChanged?.(true);
      console.trace("[TestScenarioEditorInternal: Model changed!");
      console.trace(scesim.model);
      onModelChange?.(scesim.model);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [onModelChange, scesim.model]);

  const scesimFileStatus = useMemo(() => {
    if (scesim.model.ScenarioSimulationModel) {
      const parserErrorField = "parsererror" as keyof typeof scesim.model.ScenarioSimulationModel;
      if (scesim.model.ScenarioSimulationModel[parserErrorField]) {
        return TestScenarioFileStatus.ERROR;
      }
      if (scesim.model.ScenarioSimulationModel["@_version"] != CURRENT_SUPPORTED_VERSION) {
        return TestScenarioFileStatus.UNSUPPORTED;
      } else if (scesim.model.ScenarioSimulationModel.settings?.type) {
        return TestScenarioFileStatus.VALID;
      } else {
        return TestScenarioFileStatus.NEW;
      }
    } else {
      return TestScenarioFileStatus.EMPTY;
    }
  }, [scesim]);

  console.trace("[TestScenarioEditorInternal] File Status: " + TestScenarioFileStatus[scesimFileStatus]);

  return (
    <div ref={testScenarioEditorRootElementRef}>
      {(() => {
        switch (scesimFileStatus) {
          case TestScenarioFileStatus.EMPTY:
            return (
              <Bullseye>
                <Spinner aria-label="SCESIM Data loading .." />
              </Bullseye>
            );
          case TestScenarioFileStatus.ERROR:
            return (
              <TestScenarioParserErrorPanel
                parserErrorTitle={"File parsing error"}
                parserErrorMessage={
                  "Impossibile to correctly parse the provided scesim file. Most likely, the XML structure of the file " +
                  "is invalid."
                }
              />
            );
          case TestScenarioFileStatus.NEW:
            return <TestScenarioCreationPanel />;
          case TestScenarioFileStatus.UNSUPPORTED:
            return (
              <TestScenarioParserErrorPanel
                parserErrorTitle={
                  "This file holds a Test Scenario asset version (" +
                  scesim.model.ScenarioSimulationModel["@_version"] +
                  ") not supported"
                }
                parserErrorMessage={
                  "Most likely, this file has been generated with a very old Business Central version (< 7.30.0.Final). " +
                  "Please update your Business Central instance and download again this scesim file, it will be automatically updated to the supported version (" +
                  CURRENT_SUPPORTED_VERSION +
                  ")."
                }
              />
            );
          case TestScenarioFileStatus.VALID:
            return <TestScenarioMainPanel fileName={"Test"} scesimModel={scesim.model} />;
        }
      })()}
    </div>
  );
};

export const TestScenarioEditor = React.forwardRef(
  (props: TestScenarioEditorProps, ref: React.Ref<TestScenarioEditorRef>) => {
    console.trace("[TestScenarioEditor] Component creation ... ");
    console.trace(props.model);

    const store = useMemo(
      /* DEFINE EMPTY CACHE */
      () => createTestScenarioEditorStore(props.model /*new ComputedStateCache<Computed>(INITIAL_COMPUTED_CACHE)*/),
      // Purposefully empty. This memoizes the initial value of the store
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    const storeRef = React.useRef<StoreApiType>(store);

    const resetState: ErrorBoundaryPropsWithFallback["onReset"] = useCallback(({ args }) => {
      storeRef.current?.setState((state) => {
        //state.diagram = defaultStaticState().diagram;
        state.scesim.model = args[0];
      });
    }, []);

    return (
      <I18nDictionariesProvider
        defaults={testScenarioEditorI18nDefaults}
        dictionaries={testScenarioEditorDictionaries}
        initialLocale={navigator.language}
        ctx={TestScenarioEditorI18nContext}
      >
        <TestScenarioEditorContextProvider {...props}>
          <ErrorBoundary FallbackComponent={TestScenarioEditorErrorFallback} onReset={resetState}>
            <TestScenarioEditorStoreApiContext.Provider value={storeRef.current}>
              <TestScenarioEditorInternal forwardRef={ref} {...props} />
            </TestScenarioEditorStoreApiContext.Provider>
          </ErrorBoundary>
        </TestScenarioEditorContextProvider>
      </I18nDictionariesProvider>
    );
  }
);
