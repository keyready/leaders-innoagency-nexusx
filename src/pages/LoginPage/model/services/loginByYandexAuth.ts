import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

export const loginByYandexAuth = createAsyncThunk<
    any,
    number,
    ThunkConfig<string>>(
        'loginPage/loginByYandexAuth',
        async (code, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post('/yandex_login', { code });

                if (!response.data) {
                    throw new Error();
                }

                console.log();

                return response.data;
            } catch (error) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data);
            }
        },
    );
