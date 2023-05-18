import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    versionKey:false,
    timestamps:false,
    collection:'platforms'
})
export class Platform extends Document{
    @Prop({type:String})
    metro:string

    @Prop({type:String,unique:true})
    address: string

    @Prop({type:String,unique:true})
    name: string

    @Prop({type:String,unique:true})
    subtitle:string

    @Prop({type:Number})
    cost: number

    @Prop({type:String,unique:true})
    description: string

    @Prop({type:[String]})
    images: String[]

    @Prop({type:Date})
    date: Date

    @Prop({type:[Object]})
    booking: {
        userId: string
        date: Date
        startTime: Date
        endTime: Date
    }

}

export const PlatformSchema = SchemaFactory.createForClass(Platform)