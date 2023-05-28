import { createSlice } from '@reduxjs/toolkit';
import { acceptComplaint } from '../services/acceptComplaint';
import { dismissComplaint } from '../services/dismissComaplaint';
import { submitComplaint } from '../services/submitComplaint';
import { ComplaintSchema } from '../types/ComplaintSchema';

const initialState: ComplaintSchema = {
    isLoading: false,
};

export const ComplaintSlice = createSlice({
    name: 'Complaint',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitComplaint.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(submitComplaint.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(submitComplaint.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })

            .addCase(acceptComplaint.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(acceptComplaint.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(acceptComplaint.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })

            .addCase(dismissComplaint.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(dismissComplaint.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(dismissComplaint.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: ComplaintActions } = ComplaintSlice;
export const { reducer: ComplaintReducer } = ComplaintSlice;
