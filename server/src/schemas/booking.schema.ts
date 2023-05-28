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
    platformTitle:string

    @Prop({type:Date})
    date: Date

    @Prop({type:Date})
    startTime: Date

    @Prop({type:Date})
    endTime: Date

    @Prop({type:Number})
    bookingPlaces: number

    @Prop({type:String})
    body: string

    @Prop({type:Boolean,default:false})
    isFinshed: boolean

    @Prop({type:String,default:null})
    comment:string
}

export const BookingSchema = SchemaFactory.createForClass(Booking)