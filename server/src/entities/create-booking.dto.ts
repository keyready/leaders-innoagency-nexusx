export interface CreateBookingDto {
    date: Date
    startTime: Date
    endTime: Date 
    comment: string
    bookedPlaces: number
}