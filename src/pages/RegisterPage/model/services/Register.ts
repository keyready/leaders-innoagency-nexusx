import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

export const register = createAsyncThunk<
    User,
    any,
    ThunkConfig<string>>(
        'registerPage/Register',
        async (registerData, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<User>('/register', registerData);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (error) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data);
            }
        },
    );
