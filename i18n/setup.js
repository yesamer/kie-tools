import * as React from "react";
import { useContext } from "react";
import { en } from "./locales";
export const importJavaClassesWizardI18nDefaults = {
    locale: "en",
    dictionary: en,
};
export const importJavaClassesWizardI18nDictionaries = new Map([
    ["en", en],
]);
export const ImportJavaClassesWizardI18nContext = React.createContext({});
export function useImportJavaClassesWizardI18n() {
    return useContext(ImportJavaClassesWizardI18nContext);
}
//# sourceMappingURL=setup.js.map