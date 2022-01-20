import { jsx as _jsx } from "react/jsx-runtime";
import { importJavaClassesWizardI18nDictionaries, ImportJavaClassesWizardI18nContext, importJavaClassesWizardI18nDefaults, } from "../../i18n";
import { I18nDictionariesProvider } from "@kie-tooling-core/i18n/dist/react-components";
import { ImportJavaClassesWizard } from "./ImportJavaClassesWizard";
export const ImportJavaClasses = ({ gwtLayerService, javaCodeCompletionService }) => {
    return (_jsx(I18nDictionariesProvider, Object.assign({ defaults: importJavaClassesWizardI18nDefaults, dictionaries: importJavaClassesWizardI18nDictionaries, initialLocale: navigator.language, ctx: ImportJavaClassesWizardI18nContext }, { children: _jsx(ImportJavaClassesWizard, { gwtLayerService: gwtLayerService, javaCodeCompletionService: javaCodeCompletionService }, void 0) }), void 0));
};
//# sourceMappingURL=ImportJavaClasses.js.map