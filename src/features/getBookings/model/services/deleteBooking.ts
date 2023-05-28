import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { Booking } from 'entities/Booking';

export const deleteBooking = createAsyncThunk<
    Booking[],
    string,
    ThunkConfig<string>>(
        'booking/deleteBooking',
        async (bookingId, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<Booking[]>('/delete_booking', {
                    bookingId,
                });

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
