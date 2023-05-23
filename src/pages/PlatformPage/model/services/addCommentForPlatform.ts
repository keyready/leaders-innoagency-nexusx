import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { Comment } from 'entities/Comment';

interface AddCommentForPlatformProps {
    body?: string;
    rate?: number;
    userId?: string;
    platformId?: string;
}

export const addCommentForPlatform = createAsyncThunk<
    Comment[],
    AddCommentForPlatformProps,
    ThunkConfig<string>
>(
    'Platform Page / addCommentForPlatform',
    async (props, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<Comment[]>('/comments', props);

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
