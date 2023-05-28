import { EntityState } from '@reduxjs/toolkit';
import { Booking } from 'entities/Booking';

export interface GetBookingsSchema extends EntityState<Booking> {
    isLoading: boolean;
    error?: string
}
