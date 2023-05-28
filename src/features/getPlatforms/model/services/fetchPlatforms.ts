import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Platform } from 'entities/Platform';
import { AxiosError } from 'axios';

export const fetchPlatforms = createAsyncThunk<
    Platform[],
    string,
    ThunkConfig<string>
>(
    'fetchPlatforms/fetchPlatforms',
    async (query, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<Platform[]>(`/platforms?q=${query}`);

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
