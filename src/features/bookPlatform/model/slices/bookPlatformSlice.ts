import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookPlatformSchema } from '../types/bookPlatformSchema';

const initialState: BookPlatformSchema = {
    isLoading: false,
};

export const bookPlatformSlice = createSlice({
    name: 'bookPlatform',
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

export const { actions: bookPlatformActions } = bookPlatformSlice;
export const { reducer: bookPlatformReducer } = bookPlatformSlice;
