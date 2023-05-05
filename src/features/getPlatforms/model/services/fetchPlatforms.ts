import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Platform } from 'entities/Platform';
import { AxiosError } from 'axios';

interface searchProps {
    query?: string
}

export const fetchPlatforms = createAsyncThunk<
    Platform[],
    searchProps | void,
    ThunkConfig<string>
>(
    'fetchPlatforms/fetchPlatforms',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<Platform[]>('/platforms');

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
