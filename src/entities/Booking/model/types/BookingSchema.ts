export interface Booking {
    _id: string;
    platformTitle?: string;
    bookingPlaces: number;
    body: string;
    date: string;
    startTime: string;
    endTime: string;
    comment: string
    isFinished: boolean;
}

export interface BookingSchema {
    data?: Booking;
    isLoading: boolean;
    error?: string
}
