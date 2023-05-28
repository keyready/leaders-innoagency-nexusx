import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

export const createPlatform = createAsyncThunk<
    string,
    any,
    ThunkConfig<string>
>(
    'OwnerPagecreatePlatform',
    async (props, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/create_platform', props);

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
