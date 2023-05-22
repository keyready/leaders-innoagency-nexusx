import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({
    versionKey:false,
    collection:'bookings',
    timestamps:false
})
export class Booking extends Document{
    
    @Prop({type:String,required:true,unique:true})
    _id: string

    @Prop({type:String})
    userId: string

    @Prop({type:String})
    platformId:string

    @Prop({type:Date})
    date: Date

    @Prop({type:Date})
    startTime: Date

    @Prop({type:Date})
    endTime: Date

    @Prop({type:Number})
    bookedPlaces: number

    @Prop({type:String})
    comment: string

}

export const BookingSchema = SchemaFactory.createForClass(Booking)