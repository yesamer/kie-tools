import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useImportJavaClassesWizardI18n } from "../../i18n";
import { ImportJavaClassesWizardFirstStep } from "./ImportJavaClassesWizardFirstStep";
import { ImportJavaClassesWizardSecondStep } from "./ImportJavaClassesWizardSecondStep";
import { ImportJavaClassesWizardThirdStep } from "./ImportJavaClassesWizardThirdStep";
import { useCallback, useEffect, useState } from "react";
import { JavaClass } from "./model/JavaClass";
import { DMNSimpleType } from "./model/DMNSimpleType";
import { getJavaClassSimpleName } from "./model/JavaClassUtils";
import { Button, Modal, ModalVariant, Tooltip, Wizard } from "@patternfly/react-core";
export const ImportJavaClassesWizard = ({ gwtLayerService, javaCodeCompletionService, }) => {
    const { i18n } = useImportJavaClassesWizardI18n();
    const [javaClasses, setJavaClasses] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [buttonStatus, setButtonStatus] = useState("loading");
    useEffect(() => {
        try {
            javaCodeCompletionService
                .isLanguageServerAvailable()
                .then((available) => {
                setButtonStatus(available ? "enable" : "disable");
            })
                .catch((reason) => {
                setButtonStatus("error");
                console.error("NOT TRY CATCH");
                console.error(reason);
            });
        }
        catch (error) {
            console.error("TRY CATCH");
            setButtonStatus("error");
            console.error(error);
        }
    }, [javaCodeCompletionService]);
    const isButtonDisabled = useCallback(() => {
        return "enable" !== buttonStatus;
    }, [buttonStatus]);
    const isButtonLoading = useCallback(() => {
        return "loading" == buttonStatus;
    }, [buttonStatus]);
    const defineTooltipMessage = useCallback(() => {
        if ("disable" === buttonStatus) {
            return i18n.modalButton.disabledMessage;
        }
        else if ("error" === buttonStatus) {
            return i18n.modalButton.errorMessage;
        }
        return undefined;
    }, [buttonStatus, i18n.modalButton.disabledMessage, i18n.modalButton.errorMessage]);
    const updateJavaFieldsReferences = useCallback((updatedJavaClasses, previousJavaClasses) => {
        const updatedJavaClassesNames = updatedJavaClasses.map((javaClass) => javaClass.name);
        const previousJavaClassesNames = previousJavaClasses.map((javaClass) => javaClass.name);
        const allFields = javaClasses.map((javaClass) => javaClass.fields).flat(1);
        allFields.forEach((field) => {
            if (field.dmnTypeRef === DMNSimpleType.ANY && updatedJavaClassesNames.includes(field.type)) {
                field.dmnTypeRef = getJavaClassSimpleName(field.type);
            }
            else if (previousJavaClassesNames.includes(field.type) && !updatedJavaClassesNames.includes(field.type)) {
                field.dmnTypeRef = DMNSimpleType.ANY;
            }
        });
    }, [javaClasses]);
    const addJavaClass = useCallback((fullClassName) => {
        setJavaClasses((prevState) => {
            if (!prevState.some((javaClass) => javaClass.name === fullClassName)) {
                const updatedSelectedJavaClasses = [...prevState, new JavaClass(fullClassName)];
                updatedSelectedJavaClasses.sort((a, b) => (a.name < b.name ? -1 : 1));
                updateJavaFieldsReferences(updatedSelectedJavaClasses, prevState);
                return updatedSelectedJavaClasses;
            }
            return prevState;
        });
    }, [updateJavaFieldsReferences]);
    const removeJavaClass = useCallback((fullClassName) => {
        setJavaClasses((prevState) => {
            const updatedSelectedJavaClasses = prevState.filter((javaClass) => javaClass.name !== fullClassName);
            updateJavaFieldsReferences(updatedSelectedJavaClasses, prevState);
            return updatedSelectedJavaClasses;
        });
    }, [updateJavaFieldsReferences]);
    const updateSelectedClassesFields = useCallback((fullClassName, fields) => {
        setJavaClasses((prevState) => {
            const updatedJavaClasses = [...prevState];
            const javaClassIndex = updatedJavaClasses.findIndex((javaClass) => javaClass.name === fullClassName);
            if (javaClassIndex > -1) {
                updatedJavaClasses[javaClassIndex].setFields(fields);
            }
            return updatedJavaClasses;
        });
    }, []);
    const isSecondStepActivatable = useCallback(() => {
        return javaClasses.length > 0;
    }, [javaClasses]);
    const isThirdStepActivatable = useCallback(() => {
        return javaClasses.length > 0 && javaClasses.every((javaClass) => javaClass.fieldsLoaded);
    }, [javaClasses]);
    const handleButtonClick = useCallback(() => setOpen((prevState) => !prevState), []);
    const handleWizardClose = useCallback(() => {
        handleButtonClick();
        setJavaClasses([]);
    }, [handleButtonClick]);
    const handleWizardSave = useCallback(() => {
        handleWizardClose();
        gwtLayerService.importJavaClassesInDataTypeEditor(javaClasses);
    }, [javaClasses, handleWizardClose, gwtLayerService]);
    const steps = [
        {
            canJumpTo: true,
            component: (_jsx(ImportJavaClassesWizardFirstStep, { javaCodeCompletionService: javaCodeCompletionService, onAddJavaClass: addJavaClass, onRemoveJavaClass: removeJavaClass, selectedJavaClasses: javaClasses }, void 0)),
            enableNext: isSecondStepActivatable(),
            hideBackButton: true,
            name: i18n.modalWizard.firstStep.stepName,
        },
        {
            canJumpTo: isSecondStepActivatable(),
            component: (_jsx(ImportJavaClassesWizardSecondStep, { javaCodeCompletionService: javaCodeCompletionService, onAddJavaClass: addJavaClass, onSelectedJavaClassedFieldsLoaded: updateSelectedClassesFields, selectedJavaClasses: javaClasses }, void 0)),
            enableNext: isThirdStepActivatable(),
            name: i18n.modalWizard.secondStep.stepName,
        },
        {
            canJumpTo: isThirdStepActivatable(),
            component: _jsx(ImportJavaClassesWizardThirdStep, { selectedJavaClasses: javaClasses }, void 0),
            name: i18n.modalWizard.thirdStep.stepName,
            nextButtonText: i18n.modalWizard.thirdStep.nextButtonText,
        },
    ];
    return (_jsxs(_Fragment, { children: [defineTooltipMessage() ? (_jsx(Tooltip, Object.assign({ content: defineTooltipMessage() }, { children: _jsx(Button, Object.assign({ "data-testid": "modal-wizard-button", isAriaDisabled: isButtonDisabled(), isLoading: isButtonLoading(), onClick: handleButtonClick, variant: "secondary" }, { children: i18n.modalButton.text }), void 0) }), void 0)) : (_jsx(Button, Object.assign({ "data-testid": "modal-wizard-button", isAriaDisabled: isButtonDisabled(), isLoading: isButtonLoading(), onClick: handleButtonClick, variant: "secondary" }, { children: i18n.modalButton.text }), void 0)),
            isOpen ? (_jsx(Modal, Object.assign({ description: i18n.modalWizard.description, isOpen: isOpen, onClose: handleWizardClose, title: i18n.modalWizard.title, variant: ModalVariant.large }, { children: _jsx(Wizard, { className: "import-java-classes", height: 600, onClose: handleWizardClose, onSave: handleWizardSave, steps: steps }, void 0) }), void 0)) : null] }, void 0));
};
//# sourceMappingURL=ImportJavaClassesWizard.js.map