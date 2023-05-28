import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';

interface BanUserProps {
    userId: string
    banReason: string
}

export const banUser = createAsyncThunk<
    string,
    BanUserProps,
    ThunkConfig<string>
>(
    'user/banUser',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<string>(
                '/ban_user',
                { userId: props.userId, banReason: props.banReason },
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
