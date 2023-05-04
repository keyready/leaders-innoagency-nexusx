export interface Booking {
    _id: string;
    userId: string;
    date?: Date;
    startTime: Date;
    endTime: Date;
}

export interface Platform {
    _id: string;
    address?: string;
    name: string;
    subtitle: string;
    cost: number | null;
    description: string;
    mainPhoto: string;
    date: Date;
    bookings: Booking[];
}
