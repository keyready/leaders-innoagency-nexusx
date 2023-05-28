import { StateSchema } from 'app/providers/StoreProvider';

export const getBookingData = (state: StateSchema) => state.booking?.data;
export const getBookingIsLoading = (state: StateSchema) => state.booking?.isLoading;
export const getBookingError = (state: StateSchema) => state.booking?.error;
