import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_ACCESSTOKEN_KEY, USER_REFRESHTOKEN_KEY } from 'shared/const';
import Cookies from 'js-cookie';
import { logout } from 'entities/User';
import { checkAuth } from '../service/checkAuth';
import { UserSchema } from '../types/UserSchema';
import { User } from '../types/User';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            // при авторизации записать данные в стейт и в локал сторадж
            Cookies.set(USER_REFRESHTOKEN_KEY, action.payload.refresh_token || '');
            Cookies.set(USER_ACCESSTOKEN_KEY, action.payload.access_token || '');
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            // проверить, авторизован ли пользователь (после закрытия и открытия приложения)
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(logout.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.authData = undefined;
                Cookies.remove(USER_ACCESSTOKEN_KEY);
                Cookies.remove(USER_REFRESHTOKEN_KEY);
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
