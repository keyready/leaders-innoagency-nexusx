import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { User } from '../types/User';

interface NewProfile {
    firstname: string;
    lastname: string
}
export const changeUserProfile = createAsyncThunk<
    User,
    NewProfile,
    ThunkConfig<string>
>(
    'user/changeUserProfile',
    async (newProfile, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<User>(
                '/change_profile',
                { newProfile },
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
