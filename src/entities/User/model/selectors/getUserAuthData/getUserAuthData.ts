import { StateSchema } from 'app/providers/StoreProvider';

export const getUserAuthData = (state: StateSchema) => state.user.authData;
export const getUserError = (state: StateSchema) => state.user.error;
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;
export const getUserCheckOldPasswordError = (state: StateSchema) => state.user.checkOldPasswordError;
