import { StateSchema } from 'app/providers/StoreProvider';

export const getCommentsIsLoading = (state: StateSchema) => state.getComments.isLoading;
export const getCommentsError = (state: StateSchema) => state.getComments.error;
