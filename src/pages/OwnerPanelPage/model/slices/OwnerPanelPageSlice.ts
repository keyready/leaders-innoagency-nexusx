import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OwnerPanelPageSchema } from '../types/OwnerPanelPageSchema';

const initialState: OwnerPanelPageSchema = {
    isLoading: false,
};

export const OwnerPanelPageSlice = createSlice({
    name: 'OwnerPanelPage',
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

export const { actions: OwnerPanelPageActions } = OwnerPanelPageSlice;
export const { reducer: OwnerPanelPageReducer } = OwnerPanelPageSlice;
