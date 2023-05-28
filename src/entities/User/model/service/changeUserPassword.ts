import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';

export const changeUserPassword = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>(
    'user/changeUserPassword',
    async (newPassword, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<string>(
                '/change_password',
                { newPassword },
            );

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
