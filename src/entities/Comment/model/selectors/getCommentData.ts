import { StateSchema } from 'app/providers/StoreProvider';

export const getCommentData = (state: StateSchema) => state.comment?.data;
export const getCommentError = (state: StateSchema) => state.comment?.error;
export const getCommentIsLoading = (state: StateSchema) => state.comment?.isLoading;
