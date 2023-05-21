import { StateSchema } from 'app/providers/StoreProvider';

export const getBookPlatformError = (state: StateSchema) => state.bookPlatform?.error;
export const getBookPlatformSuccessMessage = (state: StateSchema) => state.bookPlatform?.successMessage;
export const getBookPlatformIsLoading = (state: StateSchema) => state.bookPlatform?.isLoading;
