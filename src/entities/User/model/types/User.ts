import { UserBooking, UserRoles } from '../consts/consts';

/**
 *
 */

export interface User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    middlename: string;
    avatar?: string;
    booking?: UserBooking[];
    roles?: UserRoles[];
}
