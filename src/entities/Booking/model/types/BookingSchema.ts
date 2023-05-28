export interface Booking {
    _id: string;
    userId: string;
    platformId?: string;
    platformTitle?: string;
    places: number;
    body: string;
    date: string;
    startTime: string;
    endTime: string;
}

export interface BookingSchema {
    data?: Booking;
    isLoading: boolean;
    error?: string
}
