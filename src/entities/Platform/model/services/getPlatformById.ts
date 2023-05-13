import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { Platform } from '../types/Platform';

export const getPlatformById = createAsyncThunk<
    Platform,
    string,
    ThunkConfig<string>>(
        'platform/getPlatformById',
        async (id, thunkAPI) => {
            const { extra, dispatch, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.get<Platform>(`/platforms?_id=${id}`);

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
