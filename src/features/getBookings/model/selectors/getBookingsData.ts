import { StateSchema } from 'app/providers/StoreProvider';

export const getBookingsIsLoading = (state: StateSchema) => state.getBookings?.isLoading;
export const getBookingsError = (state: StateSchema) => state.getBookings?.error;
