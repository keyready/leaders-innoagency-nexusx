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

export interface Platform {
    _id: string;
    address?: string;
    name: string;
    description: string;
    mainPhoto: string;
    informationBlocks: InformationBlocks[];
    maxCapacity: number;
    bookings: Booking[];
}
