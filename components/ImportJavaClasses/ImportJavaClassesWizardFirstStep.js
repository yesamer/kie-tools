import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./ImportJavaClassesWizardFirstStep.css";
import { Bullseye, DataList, DataListCell, DataListCheck, DataListItem, DataListItemRow, EmptyState, EmptyStateBody, EmptyStateIcon, SearchInput, Spinner, Tooltip, Title, } from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/js/icons/cubes-icon";
import { useImportJavaClassesWizardI18n } from "../../i18n";
import { useCallback, useState } from "react";
export const ImportJavaClassesWizardFirstStep = ({ javaCodeCompletionService, onAddJavaClass, onRemoveJavaClass, selectedJavaClasses, }) => {
    const { i18n } = useImportJavaClassesWizardI18n();
    const [searchValue, setSearchValue] = useState("");
    const [retrievedJavaClassesNames, setRetrievedJavaClassesNames] = useState([]);
    const [isRequestLoading, setRequestLoading] = useState(false);
    const [requestTimer, setRequestTimer] = useState(undefined);
    const retrieveJavaClasses = useCallback((value) => {
        setRequestLoading(true);
        javaCodeCompletionService
            .getClasses(value)
            .then((javaCodeCompletionClasses) => {
            const retrievedClasses = javaCodeCompletionClasses.map((item) => item.query);
            setRetrievedJavaClassesNames(retrievedClasses);
            setRequestLoading(false);
        })
            .catch((reason) => {
            setRetrievedJavaClassesNames([]);
            setRequestLoading(false);
            console.error(reason);
        });
    }, [javaCodeCompletionService]);
    const handleSearchValueChange = useCallback((value) => {
        setSearchValue(value);
        if (requestTimer) {
            clearTimeout(requestTimer);
        }
        if (value.length > 2) {
            setRequestTimer(global.setTimeout(() => {
                retrieveJavaClasses(value);
            }, 1000));
        }
        else {
            setRetrievedJavaClassesNames([]);
        }
    }, [retrieveJavaClasses, requestTimer]);
    const handleClearSearch = useCallback(() => {
        setSearchValue("");
        setRetrievedJavaClassesNames([]);
    }, []);
    const handleDataListCheckChange = useCallback((fullClassName) => {
        if (!selectedJavaClasses.map((javaClass) => javaClass.name).includes(fullClassName)) {
            onAddJavaClass(fullClassName);
        }
        else {
            onRemoveJavaClass(fullClassName);
        }
    }, [selectedJavaClasses, onAddJavaClass, onRemoveJavaClass]);
    const isDataListChecked = useCallback((fullClassName) => {
        if (selectedJavaClasses.map((javaClass) => javaClass.name).includes(fullClassName)) {
            return true;
        }
        else {
            return false;
        }
    }, [selectedJavaClasses]);
    const dataListClassesSet = [
        ...new Set(selectedJavaClasses.map((value) => value.name).concat(retrievedJavaClassesNames)),
    ];
    return (_jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: "fs-search-input" }, { children: searchValue.length < 3 ? (_jsx(Tooltip, Object.assign({ content: i18n.modalWizard.firstStep.input.tooltip }, { children: _jsx(SearchInput, { autoFocus: true, onChange: handleSearchValueChange, onClear: handleClearSearch, placeholder: i18n.modalWizard.firstStep.input.placeholder, value: searchValue }, void 0) }), void 0)) : (_jsx(SearchInput, { autoFocus: true, onChange: handleSearchValueChange, onClear: handleClearSearch, placeholder: i18n.modalWizard.firstStep.input.placeholder, value: searchValue }, void 0)) }), void 0),
            isRequestLoading ? (_jsx(Bullseye, { children: _jsx(Spinner, { isSVG: true }, void 0) }, void 0)) : retrievedJavaClassesNames.length > 0 || selectedJavaClasses.length > 0 ? (_jsx(DataList, Object.assign({ "aria-label": "class-data-list" }, { children: dataListClassesSet.map((value) => (_jsx(DataListItem, Object.assign({ name: value }, { children: _jsxs(DataListItemRow, { children: [_jsx(DataListCheck, { "aria-labelledby": value, checked: isDataListChecked(value), onChange: () => handleDataListCheckChange(value) }, void 0),
                            _jsx(DataListCell, { children: _jsx("span", Object.assign({ id: value }, { children: value }), void 0) }, void 0)] }, void 0) }), value))) }), void 0)) : (_jsx(EmptyStep, { emptyStateBodyText: i18n.modalWizard.firstStep.emptyState.body, emptyStateTitleText: i18n.modalWizard.firstStep.emptyState.title }, void 0))] }, void 0));
};
const EmptyStep = ({ emptyStateBodyText, emptyStateTitleText, }) => {
    return (_jsxs(EmptyState, { children: [_jsx(EmptyStateIcon, { icon: CubesIcon }, void 0),
            _jsx(Title, Object.assign({ headingLevel: "h6", size: "md" }, { children: emptyStateTitleText }), void 0),
            _jsx(EmptyStateBody, { children: emptyStateBodyText }, void 0)] }, void 0));
};
//# sourceMappingURL=ImportJavaClassesWizardFirstStep.js.map