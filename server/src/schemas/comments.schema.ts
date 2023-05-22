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

    @Prop({type:String})
    userId: string
    
    @Prop({type:String})
    platformId: string

    @Prop({type:String})
    bodyComment: string

    @Prop({type:Number})
    rate: number

}

export const CommentSchema = SchemaFactory.createForClass(Comment)