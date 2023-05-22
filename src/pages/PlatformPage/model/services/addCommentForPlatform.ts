import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { getUserAuthData } from 'entities/User';
import { getPlatformData } from 'entities/Platform';

interface AddCommentForPlatformProps {
    body?: string;
    rate?: number;
    userId?: string;
    platformId?: string;
}

export const addCommentForPlatform = createAsyncThunk<
    string,
    AddCommentForPlatformProps,
    ThunkConfig<string>
>(
    'platformPage1/fetchCommentsByPlatformId',
    async (props, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/comments', props);

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
