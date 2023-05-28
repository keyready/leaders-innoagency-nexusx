import { createSlice } from '@reduxjs/toolkit';
import { createPlatform } from '../services/createPlatform';
import { OwnerPanelPageSchema } from '../types/OwnerPanelPageSchema';

const initialState: OwnerPanelPageSchema = {
    isLoading: false,
};

export const OwnerPanelPageSlice = createSlice({
    name: 'OwnerPanelPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPlatform.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createPlatform.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createPlatform.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: OwnerPanelPageActions } = OwnerPanelPageSlice;
export const { reducer: OwnerPanelPageReducer } = OwnerPanelPageSlice;
