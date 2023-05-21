import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

interface BookPlatformProps {
    date?: Date;
    startTime?: Date;
    finishTime?: Date;
    comment?: string;
    bookedPlaces?: number;
}

export const bookPlatform = createAsyncThunk<
    string,
    BookPlatformProps,
    ThunkConfig<string>>(
        'platform/bokPlatform',
        async (props, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<string>('/book_platform', props);

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
