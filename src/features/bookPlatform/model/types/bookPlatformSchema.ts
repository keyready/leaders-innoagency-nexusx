export interface Booking {
    _id: string;
    userId: string;
    date?: Date;
    startTime: Date;
    endTime: Date;
}

export interface BookPlatformSchema {
    data?: Booking;
    isLoading: boolean;
    error?: string
}
