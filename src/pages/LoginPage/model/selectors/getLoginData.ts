import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginData = (state: StateSchema) => state.loginPage?.data;
export const getLoginDataError = (state: StateSchema) => state.loginPage?.error;
export const getLoginDataIsLoading = (state: StateSchema) => state.loginPage?.isLoading;
