import { Booking } from 'features/bookPlatform';

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
    tel: string;
    email: string;
    whatsapp: string;
    telegram: string;
    vkontakte: string
}
