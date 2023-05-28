import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Platform } from 'entities/Platform';
import { AxiosError } from 'axios';
import { Booking } from 'entities/Booking';

interface searchProps {
    query?: string
}

export const fetchBookingsByUserId = createAsyncThunk<
    Booking[],
    string | void,
    ThunkConfig<string>
>(
    'fetchBookings/fetchBookingsByUserId',
    async (userId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Booking[]>(`/bookings?userId=${userId}`);

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
