import { StateSchema } from 'app/providers/StoreProvider';

export const getResetPasswordIsLoading = (state: StateSchema) => state.resetPasswordPage?.isLoading;
export const getResetPasswordError = (state: StateSchema) => state.resetPasswordPage?.error;
