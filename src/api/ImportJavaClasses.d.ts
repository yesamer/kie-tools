import { JavaCodeCompletionApi } from "@kie-tooling-core/vscode-java-code-completion/dist/api";
import { JavaClass } from "../components/ImportJavaClasses/model/JavaClass";
export {};
declare global {
    interface Window {
        envelope: Envelope;
        ImportJavaClassesAPI: ImportJavaClassesAPI;
        ImportJavaClassesAPIWrapper: ImportJavaClassesAPI;
    }
    interface Envelope {
        javaCodeCompletionService: JavaCodeCompletionApi;
        lspGetClassServiceMocked: (value: string) => string[];
        lspGetClassFieldsServiceMocked: (className: string) => Promise<Map<string, string>>;
    }
    interface ImportJavaClassesAPI {
        importJavaClasses: (javaClasses: JavaClass[]) => void;
    }
}
//# sourceMappingURL=ImportJavaClasses.d.ts.map