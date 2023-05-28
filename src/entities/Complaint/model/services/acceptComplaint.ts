import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

interface ComplaintProps {
    complaintId: string;
}

export const acceptComplaint = createAsyncThunk<
    string,
    ComplaintProps,
    ThunkConfig<string>
>(
    'Platform Page / acceptComplaint',
    async (props, thunkAPI) => {
        const {
            extra, rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/accept_complaint', props);

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
