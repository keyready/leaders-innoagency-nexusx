import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlatformSchema } from '../types/PlatformSchema';

const initialState: PlatformSchema = {
    isLoading: false,
};

export const PlatformSlice = createSlice({
    name: 'Platform',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: PlatformActions } = PlatformSlice;
export const { reducer: PlatformReducer } = PlatformSlice;
