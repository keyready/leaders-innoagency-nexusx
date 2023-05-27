import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    versionKey:false,
    timestamps:false,
    collection:'comments'
})
export class Comment extends Document{
    
    @Prop({type:String,required:true,unique:true})
    _id:string

    @Prop({type:Object})
    user: object

    @Prop({type:String})
    platformTitle: string

    @Prop({type:String})
    body:string

    @Prop({type:Number})
    rate: number

}

export const CommentSchema = SchemaFactory.createForClass(Comment)