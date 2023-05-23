import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register } from '../services/Register';
import { submitCode } from '../services/SubmitCode';
import { RegisterPageSchema } from '../types/RegisterPageSchema';
import { checkEmail } from '../services/CheckEmail';

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
                state.isDataAvailable = undefined;
                state.registerError = undefined;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.isDataAvailable = undefined;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.registerError = action.payload.message;
            })

            .addCase(submitCode.pending, (state) => {
                state.codeError = undefined;
                state.isLoading = true;
                state.isDataAvailable = undefined;
                state.registerError = undefined;
            })
            .addCase(submitCode.fulfilled, (state) => {
                state.isLoading = false;
                state.isCodeCorrect = true;
                state.isDataAvailable = undefined;
            })
            .addCase(submitCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isCodeCorrect = false;
                // @ts-ignore
                state.codeError = action.payload.message;
            })

            .addCase(checkEmail.pending, (state) => {
                state.codeError = undefined;
                state.isLoading = true;
                state.isDataAvailable = undefined;
                state.registerError = undefined;
            })
            .addCase(checkEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.isCodeCorrect = true;
                state.isDataAvailable = undefined;
            })
            .addCase(checkEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.isCodeCorrect = false;
                // @ts-ignore
                state.isDataAvailable = action.payload.message;
            });
    },
});

export const { actions: RegisterPageActions } = RegisterPageSlice;
export const { reducer: RegisterPageReducer } = RegisterPageSlice;
