import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

interface LoginByUsernameProps {
    login: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
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

                // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
                // dispatch(userActions.setAuthData(response.data));

                return response.data;
            } catch (error) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data);
            }
        },
    );
