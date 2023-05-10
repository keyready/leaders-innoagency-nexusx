import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register } from '../services/Register';
import { submitCode } from '../services/SubmitCode';
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
                state.registerError = undefined;
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.registerError = action.payload.message;
            })

            .addCase(submitCode.pending, (state) => {
                state.codeError = undefined;
                state.isLoading = true;
            })
            .addCase(submitCode.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(submitCode.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.codeError = action.payload.message;
            });
    },
});

export const { actions: RegisterPageActions } = RegisterPageSlice;
export const { reducer: RegisterPageReducer } = RegisterPageSlice;
