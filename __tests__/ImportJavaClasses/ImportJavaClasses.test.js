var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { ImportJavaClasses } from "../../components";
describe("ImportJavaClasses component tests", () => {
    test("should render ImportJavaClasses Button component", () => __awaiter(void 0, void 0, void 0, function* () {
        const { baseElement } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn(() => [])) }, void 0));
        yield testImportJavaClassesButtonEnabled(baseElement);
        expect(baseElement).toMatchSnapshot();
    }));
    test("Should show Modal after clicking on the button", () => __awaiter(void 0, void 0, void 0, function* () {
        const { baseElement, getByText } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn(() => [])) }, void 0));
        yield testImportJavaClassesButtonEnabled(baseElement);
        const modalWizardButton = getByText("Import Java classes");
        modalWizardButton.click();
        expect(baseElement).toMatchSnapshot();
    }));
    test.skip("Should search box works", () => __awaiter(void 0, void 0, void 0, function* () {
        const { baseElement, getByText } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn(() => [])) }, void 0));
        yield testImportJavaClassesButtonEnabled(baseElement);
        testSearchInput(baseElement, getByText);
        const resetButton = baseElement.querySelector('[aria-label="Reset"]');
        expect(resetButton).toBeInTheDocument();
        resetButton.click();
        expect(baseElement.querySelector('[aria-label="Reset"]')).not.toBeInTheDocument();
    }));
    test.skip("Should search box with results works", () => {
        const { baseElement, getByText } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn((value) => [{ query: "com.Book" }, { query: "com.Author" }])) }, void 0));
        testSearchInput(baseElement, getByText);
        testJavaClassSelection(baseElement, false);
        let checkSecondElement = baseElement.querySelector('[aria-labelledby="com.Author"]');
        fireEvent.click(checkSecondElement);
        checkSecondElement = baseElement.querySelector('[aria-labelledby="com.Author"]');
        expect(checkSecondElement).not.toBeChecked();
        expect(baseElement).toMatchSnapshot();
    });
    test.skip("Should close Modal after opening it and clicking on the Cancel button", () => {
        const { baseElement, getByText } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn()) }, void 0));
        const modalWizardButton = getByText("Import Java classes");
        modalWizardButton.click();
        const cancelButton = getByText("Cancel");
        cancelButton.click();
        expect(baseElement).toMatchSnapshot();
    });
    test.skip("Should move to second step", () => __awaiter(void 0, void 0, void 0, function* () {
        const { baseElement, getByText } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn((value) => [{ query: "com.Book" }, { query: "com.Author" }, { query: "com.Test" }])) }, void 0));
        testSearchInput(baseElement, getByText);
        testJavaClassSelection(baseElement, true);
        yield testNextStepFieldsTable(baseElement, getByText);
        expect(baseElement).toMatchSnapshot();
    }));
    test.skip("Should move to second step and fetch a Java Class", () => __awaiter(void 0, void 0, void 0, function* () {
        const { baseElement, getByText } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn((value) => [{ query: "com.Book" }, { query: "com.Author" }, { query: "com.Test" }])) }, void 0));
        testSearchInput(baseElement, getByText);
        testJavaClassSelection(baseElement, true);
        yield testNextStepFieldsTable(baseElement, getByText);
        const fetchButton = getByText('Fetch "Test" class');
        fetchButton.click();
        yield waitFor(() => {
            expect(getByText("(Test)")).toBeInTheDocument();
        });
        expect(baseElement).toMatchSnapshot();
    }));
    test.skip("Should move to second step and fetch, remove a Java Class", () => __awaiter(void 0, void 0, void 0, function* () {
        const { baseElement, getByText } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn((value) => [{ query: "com.Book" }, { query: "com.Author" }, { query: "com.Test" }])) }, void 0));
        testSearchInput(baseElement, getByText);
        testJavaClassSelection(baseElement, true);
        yield testNextStepFieldsTable(baseElement, getByText);
        yield testFetchClicked(getByText);
        const backButton = getByText("Back");
        fireEvent.click(backButton);
        let checkThirdElement = baseElement.querySelector('[aria-labelledby="com.Test"]');
        expect(checkThirdElement).toBeInTheDocument();
        expect(checkThirdElement).toBeChecked();
        fireEvent.click(checkThirdElement);
        checkThirdElement = baseElement.querySelector('[aria-labelledby="com.Test"]');
        expect(checkThirdElement).not.toBeInTheDocument();
        const nextButton = getByText("Next");
        fireEvent.click(nextButton);
        const fetchButton = getByText('Fetch "Test" class');
        expect(fetchButton).toBeInTheDocument();
    }));
    test.skip("Should move to third step", () => __awaiter(void 0, void 0, void 0, function* () {
        const { baseElement, getByText } = render(_jsx(ImportJavaClasses, { gwtLayerService: gwtLayerServiceMock, javaCodeCompletionService: getJavaCodeCompletionServiceMock(jest.fn((value) => [{ query: "com.Book" }, { query: "com.Author" }, { query: "com.Test" }])) }, void 0));
        testSearchInput(baseElement, getByText);
        testJavaClassSelection(baseElement, true);
        yield testNextStepFieldsTable(baseElement, getByText);
        yield testNextStepFieldsTable(baseElement, getByText);
        expect(baseElement).toMatchSnapshot();
    }));
    function testSearchInput(baseElement, getByText) {
        const modalWizardButton = getByText("Import Java classes");
        modalWizardButton.click();
        const inputElement = baseElement.querySelector('[aria-label="Search input"]');
        expect(inputElement).toHaveValue("");
        expect(baseElement.querySelector('[aria-label="Reset"]')).not.toBeInTheDocument();
        fireEvent.change(inputElement, { target: { value: "test" } });
        expect(inputElement).toHaveValue("test");
        expect(baseElement.querySelector('[aria-label="Reset"]')).toBeInTheDocument();
    }
    function testJavaClassSelection(baseElement, hasThirdElement) {
        const firstElement = baseElement.querySelector('[id="com.Book"]');
        expect(firstElement).toBeInTheDocument();
        const secondElement = baseElement.querySelector('[id="com.Author"]');
        expect(secondElement).toBeInTheDocument();
        if (hasThirdElement) {
            const thirdElement = baseElement.querySelector('[id="com.Test"]');
            expect(thirdElement).toBeInTheDocument();
        }
        let checkFirstElement = baseElement.querySelector('[aria-labelledby="com.Book"]');
        expect(checkFirstElement).toBeInTheDocument();
        expect(checkFirstElement).not.toBeChecked();
        let checkSecondElement = baseElement.querySelector('[aria-labelledby="com.Author"]');
        expect(checkSecondElement).toBeInTheDocument();
        expect(checkSecondElement).not.toBeChecked();
        const checkThirdElement = baseElement.querySelector('[aria-labelledby="com.Test"]');
        if (hasThirdElement) {
            expect(checkThirdElement).toBeInTheDocument();
            expect(checkThirdElement).not.toBeChecked();
        }
        fireEvent.click(checkFirstElement);
        checkFirstElement = baseElement.querySelector('[aria-labelledby="com.Book"]');
        expect(checkFirstElement).toBeChecked();
        expect(checkSecondElement).not.toBeChecked();
        if (hasThirdElement) {
            expect(checkThirdElement).not.toBeChecked();
        }
        fireEvent.click(checkSecondElement);
        checkSecondElement = baseElement.querySelector('[aria-labelledby="com.Author"]');
        expect(checkFirstElement).toBeChecked();
        expect(checkSecondElement).toBeChecked();
        if (hasThirdElement) {
            expect(checkThirdElement).not.toBeChecked();
        }
    }
    function testNextStepFieldsTable(baseElement, getByText) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextButton = getByText("Next");
            fireEvent.click(nextButton);
            yield waitFor(() => {
                expect(baseElement.querySelector('[aria-label="field-table"]')).toBeInTheDocument();
            });
            const expandToggle = baseElement.querySelector('[id="expand-toggle0"]');
            expect(expandToggle).toHaveAttribute("aria-expanded", "true");
            fireEvent.click(expandToggle);
            expect(expandToggle).toHaveAttribute("aria-expanded", "false");
            fireEvent.click(expandToggle);
        });
    }
    function testFetchClicked(getByText) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchButton = getByText('Fetch "Test" class');
            fetchButton.click();
            yield waitFor(() => {
                expect(getByText("(Test)")).toBeInTheDocument();
            });
        });
    }
    function testImportJavaClassesButtonEnabled(baseElement) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitFor(() => {
                expect(baseElement.querySelector('[aria-disabled="false"][type="button"]')).toBeInTheDocument();
            });
        });
    }
    const lspGetClassFieldsServiceMocked = (className) => __awaiter(void 0, void 0, void 0, function* () {
        const bookClassFieldsMap = new Map();
        bookClassFieldsMap.set("title", "java.lang.String");
        bookClassFieldsMap.set("year", "java.lang.Integer");
        bookClassFieldsMap.set("test", "com.Test");
        const authorClassFieldsMap = new Map();
        authorClassFieldsMap.set("name", "java.lang.String");
        authorClassFieldsMap.set("isAlive", "java.lang.Boolean");
        if (className === "com.Book") {
            return bookClassFieldsMap;
        }
        else if (className === "com.Author") {
            return authorClassFieldsMap;
        }
        else {
            return new Map();
        }
    });
    const gwtLayerServiceMock = {
        importJavaClassesInDataTypeEditor: jest.fn((javaClasses) => {
        }),
    };
    function getJavaCodeCompletionServiceMock(getClassesMock) {
        const javaCodeCompletionServiceMock = {
            getClasses: getClassesMock,
            getFields: jest.fn(() => new Promise(() => [])),
            isLanguageServerAvailable: isLanguageServerAvailableMock,
        };
        return javaCodeCompletionServiceMock;
    }
    const isLanguageServerAvailableMock = () => __awaiter(void 0, void 0, void 0, function* () {
        return true;
    });
});
//# sourceMappingURL=ImportJavaClasses.test.js.map