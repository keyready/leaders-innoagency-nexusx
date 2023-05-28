import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

export const submitCode = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>>(
        'registerPage/submitCode',
        async (code, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<string>('/submit_code', { code });

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
