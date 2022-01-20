import { ReferenceDictionary } from "@kie-tooling-core/i18n/dist/core";
import { CommonI18n } from "@kogito-tooling/i18n-common-dictionary";
interface ImportJavaClassesWizardDictionary extends ReferenceDictionary {
    modalButton: {
        text: string;
        disabledMessage: string;
        errorMessage: string;
    };
    modalWizard: {
        title: string;
        description: string;
        firstStep: {
            stepName: string;
            input: {
                placeholder: string;
                title: string;
                tooltip: string;
            };
            emptyState: {
                title: string;
                body: string;
            };
        };
        secondStep: {
            stepName: string;
        };
        thirdStep: {
            stepName: string;
            nextButtonText: string;
        };
        fieldTable: {
            fetchButtonLabel: string;
        };
    };
}
export interface ImportJavaClassesWizardI18n extends ImportJavaClassesWizardDictionary, CommonI18n {
}
export {};
//# sourceMappingURL=ImportJavaClassesWizardI18n.d.ts.map