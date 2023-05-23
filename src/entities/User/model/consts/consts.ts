export enum UserRoles {
    USER = 'USER',
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
}

export interface UserBooking {
    _id?: string;
    platformId?: string;
    date?: Date;
    startTime?: Date;
    endTime?: Date;
}

/**
 *
 * _id_площадки     27 апреля 2023      14:00 - 20:00
 * _id_площадки     28 апреля 2023      17:30 - 19:00
 *
 */
