import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_ACCESSTOKEN_KEY, USER_REFRESHTOKEN_KEY } from 'shared/const';
import Cookies from 'js-cookie';
import { checkPassword } from '../service/checkPassword';
import { logout } from '../service/logout';
import { checkAuth } from '../service/checkAuth';
import { UserSchema } from '../types/UserSchema';
import { User } from '../types/User';
import { changeUserPassword } from '../service/changeUserPassword';
import { changeUserProfile } from '../service/changeUserProfile';
import { banUser } from '../service/banUser';
import { unbanUser } from '../service/unbanUser';
import { upgradeUserRoles } from '../service/upgradeUserRoles';
import { downgradeUserRoles } from '../service/downgradeUserRoles';

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
            // const user = Cookies.get('user');
            // if (user) {
            //     state.authData = JSON.parse(user);
            // }
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
            })

            .addCase(checkPassword.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(checkPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(checkPassword.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.checkOldPasswordError = action.payload.message;
            })

            .addCase(changeUserPassword.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(changeUserPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changeUserPassword.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })

            .addCase(changeUserProfile.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(changeUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(changeUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })

            .addCase(banUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(banUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(banUser.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })
            .addCase(unbanUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(unbanUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(unbanUser.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })

            .addCase(upgradeUserRoles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(upgradeUserRoles.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(upgradeUserRoles.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            })
            .addCase(downgradeUserRoles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(downgradeUserRoles.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(downgradeUserRoles.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload.message;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
