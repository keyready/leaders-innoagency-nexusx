import { StateSchema } from 'app/providers/StoreProvider';

export const getCommentsIsLoading = (state: StateSchema) => state.platformPage?.comments?.isLoading;
export const getCommentsError = (state: StateSchema) => state.platformPage?.comments?.error;
