import { Booking } from 'entities/Booking';

export interface BookPlatformSchema {
    data?: Booking;
    isLoading: boolean;
    error?: string;
    successMessage?: string;
}
