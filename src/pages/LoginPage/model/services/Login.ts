import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { USER_ACCESSTOKEN_KEY, USER_REFRESHTOKEN_KEY } from 'shared/const';

export const login = createAsyncThunk<
    User,
    any,
    ThunkConfig<string>>(
        'loginPage/loginByUsername',
        async (authData, thunkAPI) => {
            const { extra, dispatch, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<User>('/login', authData);

                if (!response.data) {
                    throw new Error();
                }

                Cookies.set(USER_REFRESHTOKEN_KEY, response.data.refresh_token || '');
                Cookies.set(USER_ACCESSTOKEN_KEY, response.data.access_token || '');
                dispatch(userActions.setAuthData(response.data));

                return response.data;
            } catch (error) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data);
            }
        },
    );
