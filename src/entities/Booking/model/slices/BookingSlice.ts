import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingSchema } from '../types/BookingSchema';

const initialState: BookingSchema = {
    isLoading: false,
};

export const BookingSlice = createSlice({
    name: 'Booking',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(.rejected, (state, action) => {
    //             state.isLoading = false;
    //             // @ts-ignore
    //             state.error = action.payload.message;
    //         });
    // },
});

export const { actions: BookingActions } = BookingSlice;
export const { reducer: BookingReducer } = BookingSlice;
