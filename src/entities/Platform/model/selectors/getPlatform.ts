import { StateSchema } from 'app/providers/StoreProvider';

export const getPlatformData = (state: StateSchema) => state.platform?.data;
export const getPlatformIsLoading = (state: StateSchema) => state.platform?.isLoading;
export const getPlatformError = (state: StateSchema) => state.platform?.error;
