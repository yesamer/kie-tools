import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./ImportJavaClassesWizardFieldListTable.css";
import { ExpandableRowContent, TableComposable, Tbody, Td, Tr } from "@patternfly/react-table";
import { Button } from "@patternfly/react-core";
import { DMNSimpleType } from "./model/DMNSimpleType";
import { getJavaClassSimpleName } from "./model/JavaClassUtils";
import { useCallback, useState } from "react";
import { useImportJavaClassesWizardI18n } from "../../i18n";
export const ImportJavaClassesWizardFieldListTable = (props) => {
    return (_jsx(TableComposable, Object.assign({ "aria-label": "field-table" }, { children: props.selectedJavaClassFields.map((javaClass, index) => {
            return (_jsx(TableJavaClassItem, { javaClass: javaClass, index: index, loadJavaClass: props.loadJavaClass }, javaClass.name));
        }) }), void 0));
};
const TableJavaClassItem = ({ javaClass, index, loadJavaClass, }) => {
    const { i18n } = useImportJavaClassesWizardI18n();
    const [isExpanded, setExpanded] = useState(true);
    const isFetchable = useCallback((field) => {
        return field.dmnTypeRef === DMNSimpleType.ANY;
    }, []);
    const parentRow = (_jsxs(Tr, { children: [_jsx(Td, { expand: javaClass.fields && javaClass.fields.length > 0
                    ? {
                        rowIndex: index,
                        isExpanded: isExpanded,
                        onToggle: () => setExpanded((prevState) => !prevState),
                    }
                    : undefined }, `${javaClass.name}_td0`),
            _jsxs(Td, { children: [_jsx("span", { children: _jsx("strong", { children: getJavaClassSimpleName(javaClass.name) }, void 0) }, void 0),
                    _jsx("span", Object.assign({ className: "dmn-type-name" }, { children: "(Structure)" }), void 0)] }, `${javaClass.name}_td1`)] }, `${javaClass.name}_tr`));
    const childRow = javaClass.fields && javaClass.fields.length > 0
        ? javaClass.fields.map((field) => {
            return (_jsxs(Tr, Object.assign({ isExpanded: isExpanded }, { children: [_jsx(Td, {}, `${field.name}_td0`),
                    _jsx(Td, { children: _jsxs(ExpandableRowContent, { children: [_jsx("span", { children: field.name }, void 0),
                                _jsx("span", Object.assign({ className: "dmn-type-name" }, { children: `(${field.dmnTypeRef})` }), void 0),
                                loadJavaClass && isFetchable(field) && (_jsx(Button, Object.assign({ className: "fetch-button", onClick: () => loadJavaClass(field.type), variant: "primary", isSmall: true }, { children: `${i18n.modalWizard.fieldTable.fetchButtonLabel} "${getJavaClassSimpleName(field.type)}" class` }), void 0))] }, void 0) }, `${field.name}_td1`)] }), `${field.name}_tr`));
        })
        : undefined;
    return (_jsxs(Tbody, Object.assign({ isExpanded: isExpanded }, { children: [parentRow, childRow] }), index));
};
//# sourceMappingURL=ImportJavaClassesWizardFieldListTable.js.map