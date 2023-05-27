import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Booking } from 'entities/Booking';
import { fetchBookingsByUserId } from '../services/fetchBookingsByUserId';
import { GetBookingsSchema } from '../types/getBookingsSchema';
import { deleteBooking } from '../services/deleteBooking';

const bookingsAdapter = createEntityAdapter<Booking>({
    selectId: (booking) => booking._id,
});

export const getBookings = bookingsAdapter.getSelectors<StateSchema>(
    (state) => state.getBookings || bookingsAdapter.getInitialState(),
);

export const getBookingsSlice = createSlice({
    name: 'getBookings',
    initialState: bookingsAdapter.getInitialState<GetBookingsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingsByUserId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchBookingsByUserId.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.isLoading = false;
                bookingsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchBookingsByUserId.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.data;
            })

            .addCase(deleteBooking.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.isLoading = false;
                bookingsAdapter.setAll(state, action.payload);
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.data;
            });
    },
});

export const { actions: getBookingsActions } = getBookingsSlice;
export const { reducer: getBookingsReducer } = getBookingsSlice;
