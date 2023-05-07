import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions, User } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

export const register = createAsyncThunk<
    User,
    any,
    ThunkConfig<string>>(
        'registerPage/Register',
        async (registerData, thunkAPI) => {
            const { extra, dispatch, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<User>('/register', registerData);

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
