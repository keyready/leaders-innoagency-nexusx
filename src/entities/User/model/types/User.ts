import { UserBooking, UserRoles } from '../consts/consts';

export interface User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    middlename: string;
    avatar: string;
    booking: UserBooking[];
    email: string;
    phoneNumber: string;
    roles: UserRoles[];
    lastVisit: Date;
    isBanned: boolean;
    access_token?: string;
    refresh_token?: string;
}
