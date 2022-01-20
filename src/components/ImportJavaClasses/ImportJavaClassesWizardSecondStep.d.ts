import { JavaField } from "./model/JavaField";
import { JavaClass } from "./model/JavaClass";
import { JavaCodeCompletionService } from "./services";
export interface ImportJavaClassesWizardSecondStepProps {
    javaCodeCompletionService: JavaCodeCompletionService;
    onAddJavaClass: (fullClassName: string) => void;
    onSelectedJavaClassedFieldsLoaded: (fullClassName: string, fields: JavaField[]) => void;
    selectedJavaClasses: JavaClass[];
}
export declare const ImportJavaClassesWizardSecondStep: ({ javaCodeCompletionService, onAddJavaClass, onSelectedJavaClassedFieldsLoaded, selectedJavaClasses, }: ImportJavaClassesWizardSecondStepProps) => JSX.Element;
//# sourceMappingURL=ImportJavaClassesWizardSecondStep.d.ts.map