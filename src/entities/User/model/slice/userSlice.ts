import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_ACCESSTOKEN_KEY, USER_REFRESHTOKEN_KEY } from 'shared/const';
import Cookies from 'js-cookie';
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
        logout: (state) => {
            // выход
            Cookies.remove(USER_ACCESSTOKEN_KEY);
            Cookies.remove(USER_REFRESHTOKEN_KEY);
            state.authData = undefined;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
