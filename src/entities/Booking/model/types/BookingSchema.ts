export interface Booking {
    _id: string;
    userId: string;
    platformId?: string;
    platformTitle?: string;
    places: number;
    body: string;
    date?: Date;
    startTime: Date;
    endTime: Date;
}

export interface BookingSchema {
    data?: Booking;
    isLoading: boolean;
    error?: string
}
