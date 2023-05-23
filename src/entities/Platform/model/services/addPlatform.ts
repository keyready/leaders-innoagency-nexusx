import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { Platform } from '../types/Platform';

export const addPlatform = createAsyncThunk<
    string,
    Platform,
    ThunkConfig<string>>(
        'platform/addPlatform',
        async (newPlatform, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<string>('/platforms', { newPlatform });

                if (!response.data) {
                    throw new Error();
                }

                // @ts-ignore
                return response.data[0];
            } catch (error) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data);
            }
        },
    );
