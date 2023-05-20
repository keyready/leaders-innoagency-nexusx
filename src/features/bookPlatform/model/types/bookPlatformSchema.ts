export interface Booking {
    _id: string;
    userId: string;
    date?: Date;
    startTime: Date;
    endTime: Date;
}

export interface BookPlatformSchema {
    isLoading: boolean;
    error?: string
}
