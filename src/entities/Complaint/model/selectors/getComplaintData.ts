import { StateSchema } from 'app/providers/StoreProvider';

export const getComplaintData = (state: StateSchema) => state.complaint?.data;
export const getComplaintIsLoading = (state: StateSchema) => state.complaint?.isLoading;
export const getComplaintError = (state: StateSchema) => state.complaint?.error;
