import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    collection:'complaints',
    versionKey:false,
    timestamps:false
})
export class Complaint extends Document{
    
    @Prop({type:String,required:true,unique:true})
    _id: string

    @Prop({type:String})
    target: string 

    @Prop({type:String})
    from: string

    @Prop({type:String})
    comment: string

    @Prop({type:Boolean,default:false})
    isBanned: boolean

    @Prop({type:String})
    decision: string

}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint)