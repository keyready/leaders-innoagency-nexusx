import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { USER_REFRESHTOKEN_KEY, USER_ACCESSTOKEN_KEY } from 'shared/const';
import Cookies from 'js-cookie';
import { userActions } from '../slice/userSlice';
import { User } from '../types/User';

export const checkAuth = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>(
    'user/checkAuth',
    async (token, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await extra.api.post<User>(
                '/refresh',
                { refresh_token: token },
            );

            if (!response.data) {
                throw new Error();
            }

            if (response.data.refresh_token && response.data.access_token) {
                Cookies.set(
                    USER_REFRESHTOKEN_KEY,
                    response.data.refresh_token,
                );
                Cookies.set(
                    USER_ACCESSTOKEN_KEY,
                    response.data.access_token,
                );
            }
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
