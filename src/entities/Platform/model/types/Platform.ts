export enum InformationBlockType {
    IMAGE = 'image',
    TEXT = 'text'
}

export interface InformationBlockBase {
    _id: string;
    type?: InformationBlockType;
}

export interface InformationBlockText extends InformationBlockBase {
    type: InformationBlockType.TEXT,
    title?: string
    text: string;
}

export interface InformationBlockImage extends InformationBlockBase {
    type: InformationBlockType.IMAGE,
    image?: string;
    description?: string;
}

export type InformationBlocks = InformationBlockText | InformationBlockImage;

export interface Booking {
    _id: string;
    userId: string;
    date?: Date;
    startTime: Date;
    endTime: Date;
}

export enum PlatformTypes {
    COWORKING = 'coworking',
    CINEMA = 'cinema',
    RECORDS = 'records',
    GALLERY = 'gallery'
}

interface PlatformBase {
    _id: string;
    address?: string;
    name: string;
    description: string;
    mainPhoto: string;
    informationBlocks: InformationBlocks[];
    bookings: Booking[];
    type: PlatformTypes;
}

export interface PlatformCinema extends PlatformBase {
    type: PlatformTypes.CINEMA;
    filmName: string;
    date: Date;
    maxCapacity: number;
}
export interface PlatformRecords extends PlatformBase {
    type: PlatformTypes.RECORDS;
}

export interface Platform {

}
