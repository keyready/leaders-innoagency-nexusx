import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bookPlatform } from 'features/bookPlatform';
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
    extraReducers: (builder) => {
        builder
            .addCase(bookPlatform.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(bookPlatform.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.successMessage = action.payload;
            })
            .addCase(bookPlatform.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: bookPlatformActions } = bookPlatformSlice;
export const { reducer: bookPlatformReducer } = bookPlatformSlice;
