import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register } from 'pages/RegisterPage';
import { RegisterPageSchema } from '../types/RegisterPageSchema';

const initialState: RegisterPageSchema = {
    isLoading: false,
};

export const RegisterPageSlice = createSlice({
    name: 'RegisterPage',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: RegisterPageActions } = RegisterPageSlice;
export const { reducer: RegisterPageReducer } = RegisterPageSlice;
