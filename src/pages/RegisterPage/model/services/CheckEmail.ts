import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

export const checkEmail = createAsyncThunk<
    string,
    any,
    ThunkConfig<string>>(
        'registerPage/checkEmail',
        async (registerData, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<string>('/checkEmail', registerData);

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
