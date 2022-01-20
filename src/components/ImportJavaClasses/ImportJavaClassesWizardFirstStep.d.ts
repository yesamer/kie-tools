import "./ImportJavaClassesWizardFirstStep.css";
import { JavaClass } from "./model/JavaClass";
import { JavaCodeCompletionService } from "./services";
export interface ImportJavaClassesWizardFirstStepProps {
    javaCodeCompletionService: JavaCodeCompletionService;
    onAddJavaClass: (fullClassName: string) => void;
    onRemoveJavaClass: (fullClassName: string) => void;
    selectedJavaClasses: JavaClass[];
}
export declare const ImportJavaClassesWizardFirstStep: ({ javaCodeCompletionService, onAddJavaClass, onRemoveJavaClass, selectedJavaClasses, }: ImportJavaClassesWizardFirstStepProps) => JSX.Element;
//# sourceMappingURL=ImportJavaClassesWizardFirstStep.d.ts.map