import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResetPageSchema } from '../types/ResetPageSchema';
import { resetPassword } from '../services/resetPassword';

const initialState: ResetPageSchema = {
    isLoading: false,
};

export const ResetPageSlice = createSlice({
    name: 'ResetPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(resetPassword.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: ResetPageActions } = ResetPageSlice;
export const { reducer: ResetPageReducer } = ResetPageSlice;
