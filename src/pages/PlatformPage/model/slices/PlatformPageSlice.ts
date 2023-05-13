import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlatformPageSchema } from '../types/PlatformPageSchema';

const initialState: PlatformPageSchema = {
    isLoading: false,
};

export const PlatformPageSlice = createSlice({
    name: 'PlatformPage',
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

export const { actions: PlatformPageActions } = PlatformPageSlice;
export const { reducer: PlatformPageReducer } = PlatformPageSlice;
