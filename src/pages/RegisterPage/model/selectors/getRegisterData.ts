import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterError = (state: StateSchema) => state.registerPage?.registerError;
export const getRegisterCodeError = (state: StateSchema) => state.registerPage?.codeError;
export const getRegisterIsLoading = (state: StateSchema) => state.registerPage?.isLoading;
