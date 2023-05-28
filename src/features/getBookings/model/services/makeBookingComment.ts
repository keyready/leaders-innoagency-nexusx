import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { Booking } from 'entities/Booking';

interface MakeBookingCommentProps {
    bookingId: string;
    comment: string
}

export const makeBookingComment = createAsyncThunk<
    Booking[],
    MakeBookingCommentProps,
    ThunkConfig<string>>(
        'booking/makeBookingComment',
        async (props, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<Booking[]>('/make_booking_comment', {
                    comment: props.comment,
                    bookingId: props.bookingId,
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
