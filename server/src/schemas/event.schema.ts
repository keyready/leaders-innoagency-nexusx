import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    versionKey:false,
    collection:'events',
    timestamps:false
})
export class Event extends Document{

    @Prop({type:String,required:true,unique:true})
    _id: string

    @Prop({type:Object})
    user: object

    @Prop({type:String})
    name:string

    @Prop({type:Date})
    date: Date
}

export const EventSchema = SchemaFactory.createForClass(Event)