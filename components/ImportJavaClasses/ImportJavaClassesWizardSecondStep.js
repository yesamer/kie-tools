import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Bullseye, Spinner } from "@patternfly/react-core";
import { useCallback, useEffect } from "react";
import { ImportJavaClassesWizardFieldListTable } from "./ImportJavaClassesWizardFieldListTable";
import { JavaField } from "./model/JavaField";
import { DMNSimpleType, JAVA_TO_DMN_MAP } from "./model/DMNSimpleType";
import { getJavaClassSimpleName } from "./model/JavaClassUtils";
export const ImportJavaClassesWizardSecondStep = ({ javaCodeCompletionService, onAddJavaClass, onSelectedJavaClassedFieldsLoaded, selectedJavaClasses, }) => {
    const generateJavaClassField = useCallback((name, type, javaClasses) => {
        let dmnTypeRef = JAVA_TO_DMN_MAP.get(getJavaClassSimpleName(type)) || DMNSimpleType.ANY;
        if (dmnTypeRef === DMNSimpleType.ANY && javaClasses.some((javaClass) => javaClass.name === type)) {
            dmnTypeRef = getJavaClassSimpleName(type);
        }
        return new JavaField(name, type, dmnTypeRef);
    }, []);
    const loadJavaFields = useCallback((className) => {
        try {
            javaCodeCompletionService
                .getFields(className)
                .then((javaCodeCompletionFields) => {
                const retrievedFields = javaCodeCompletionFields.map((javaCodeCompletionField) => generateJavaClassField(javaCodeCompletionField.accessor, javaCodeCompletionField.fqcn, selectedJavaClasses));
                retrievedFields.sort((a, b) => (a.name < b.name ? -1 : 1));
                onSelectedJavaClassedFieldsLoaded(className, retrievedFields);
            })
                .catch((reason) => {
                console.error(reason);
            });
        }
        catch (error) {
            console.error(error);
        }
    }, [generateJavaClassField, javaCodeCompletionService, onSelectedJavaClassedFieldsLoaded, selectedJavaClasses]);
    useEffect(() => selectedJavaClasses
        .filter((javaClass) => !javaClass.fieldsLoaded)
        .forEach((javaClass) => loadJavaFields(javaClass.name)), [selectedJavaClasses, loadJavaFields]);
    return (_jsx(_Fragment, { children: selectedJavaClasses.some((javaClass) => !javaClass.fieldsLoaded) ? (_jsx(Bullseye, { children: _jsx(Spinner, { isSVG: true }, void 0) }, void 0)) : (_jsx(ImportJavaClassesWizardFieldListTable, { selectedJavaClassFields: selectedJavaClasses, loadJavaClass: onAddJavaClass }, void 0)) }, void 0));
};
//# sourceMappingURL=ImportJavaClassesWizardSecondStep.js.map