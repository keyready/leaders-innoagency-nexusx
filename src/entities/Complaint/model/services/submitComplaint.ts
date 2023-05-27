import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { Comment } from 'entities/Comment';

interface ComplaintProps {
    platformId: string;
    userId: string;
    comment: string;
}

export const submitComplaint = createAsyncThunk<
    string,
    ComplaintProps,
    ThunkConfig<string>
>(
    'Platform Page / submitComplaint',
    async (props, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/submit_complaint', props);

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
