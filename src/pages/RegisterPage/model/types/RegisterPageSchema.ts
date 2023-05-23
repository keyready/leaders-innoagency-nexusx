export interface RegisterPageSchema {
    isLoading: boolean;
    isDataAvailable?: string;
    isCodeCorrect?: boolean;
    registerError?: string;
    codeError?: string;
}
