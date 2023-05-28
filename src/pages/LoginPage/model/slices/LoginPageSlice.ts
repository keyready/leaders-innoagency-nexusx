import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../services/Login';
import { LoginPageSchema } from '../types/LoginPageSchema';
import { loginByYandexAuth } from '../services/loginByYandexAuth';

const initialState: LoginPageSchema = {
    data: {
        email: '',
        password: '',
        phoneNumber: '',
    },
    isLoading: false,
    error: '',
};

export const LoginPageSlice = createSlice({
    name: 'LoginPage',
    initialState,
    reducers: {
        setPassword: (state, action: PayloadAction<string>) => {
            if (state.data) state.data.password = action.payload;
        },
        setLogin: (state, action: PayloadAction<string>) => {
            if (state.data) state.data.email = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            if (state.data) state.data.phoneNumber = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })

            .addCase(loginByYandexAuth.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByYandexAuth.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByYandexAuth.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: LoginPageActions } = LoginPageSlice;
export const { reducer: LoginPageReducer } = LoginPageSlice;
