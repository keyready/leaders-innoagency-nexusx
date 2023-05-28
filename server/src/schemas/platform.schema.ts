import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    versionKey:false,
    timestamps:false,
    collection:'platforms'
})
export class Platform extends Document{

    @Prop({type:String,required:true,unique:true})
    _id:string

    @Prop({type:String,unique:true})
    address: string

    @Prop({type:String,unique:true})
    title: string

    @Prop({type:String,unique:true})
    description: string

    //TODO - множество изображений
    @Prop({type:[String]})
    images: [string]
    
    @Prop({type:Number})
    maxGuests: number
    
    @Prop({type:Number})
    freeSpacee: number
    
    @Prop({type:[String]})
    restrictions: [string]
    
    @Prop({type:Boolean,default:false})
    isBanned: boolean

}

export const PlatformSchema = SchemaFactory.createForClass(Platform)

// @Prop({type:Date})
    // date: Date
    // @Prop({type:String})
    // type: string

    // @Prop({type:String})
    // tel: string

    // @Prop({type:String})
    // email:string

    // @Prop({type:String})
    // whatsapp: string

    // @Prop({type:String})
    // telegram: string

    // @Prop({type:String})
    // vkontakte: string

    // @Prop({type:String})
    // web: string

    // @Prop({type:Object})
    // workHours:{
    //     startTime: string
    //     endTime: string
    // }
