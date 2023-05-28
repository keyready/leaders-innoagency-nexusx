export interface CreateBookingDto {
    date: Date
    startTime: Date
    endTime: Date 
    body: string
    bookingPlaces: number
}