import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByPhoneNumber } from '../services/LoginByPhoneNumber';
import { loginByUsername } from '../services/LoginByUsername';
import { LoginPageSchema } from '../types/LoginPageSchema';

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
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })

            .addCase(loginByPhoneNumber.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByPhoneNumber.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByPhoneNumber.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: LoginPageActions } = LoginPageSlice;
export const { reducer: LoginPageReducer } = LoginPageSlice;
