import { Booking } from 'features/bookPlatform';
import { User } from 'entities/User';

export interface Platform {
    _id: string;
    metro?: string;
    address?: string;
    name: string;
    subtitle: string;
    cost: number | null;
    description: string;
    images: string[];
    date: Date;
    type: 'coworking' | 'gallery' | 'event' | 'mc' | 'lecture' | 'festival' | 'film';
    bookings: Booking[];
    owner: User;
    tel: string;
    email: string;
    whatsapp: string;
    telegram: string;
    web: string;
    vkontakte: string;
    maxGuests: number;
    freeSpace: number;
    restrictions: string[]
}
