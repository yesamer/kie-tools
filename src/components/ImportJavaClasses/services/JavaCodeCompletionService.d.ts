import { JavaCodeCompletionAccessor, JavaCodeCompletionClass } from "@kie-tooling-core/vscode-java-code-completion/dist/api";
export interface JavaCodeCompletionService {
    getClasses(query: string): Promise<JavaCodeCompletionClass[]>;
    getFields(fullClassName: string): Promise<JavaCodeCompletionAccessor[]>;
    isLanguageServerAvailable(): Promise<boolean>;
}
//# sourceMappingURL=JavaCodeCompletionService.d.ts.map