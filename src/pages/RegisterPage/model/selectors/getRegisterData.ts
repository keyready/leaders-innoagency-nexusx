import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterError = (state: StateSchema) => state.registerPage?.registerError;
export const getRegisterDataAvailable = (state: StateSchema) => state.registerPage?.isDataAvailable;
export const getRegisterCodeError = (state: StateSchema) => state.registerPage?.codeError;
export const getRegisterIsCodeCorrect = (state: StateSchema) => state.registerPage?.isCodeCorrect;
export const getRegisterIsLoading = (state: StateSchema) => state.registerPage?.isLoading;
