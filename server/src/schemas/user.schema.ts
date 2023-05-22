import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    versionKey:false,
    timestamps:false,
    collection:'users'
})
export class User extends Document{

    @Prop({type:String})
    email: string;
    
    @Prop({type:String})
    phoneNumber: string

    @Prop({type:String})
    firstname: string;
        
    @Prop({type:String})
    lastname: string;
        
    @Prop({type:String})
    middlename: string;
        
    @Prop({type:String})
    password: string

    @Prop({type:String})
    dateOfBirth: string

    @Prop({type:String})
    avatar: string;
        
    @Prop({type:[Object]})
    booking: {
        id:string,
        platformId: string,
        date: Date,
        startTime: Date,
        endTime: Date
        bookedPlaces: Number
        comment: string
    }
        
    @Prop({type:[String],default:['USER']})
    roles: String[]

    @Prop({type:Boolean,default:false})
    isActivated: boolean

    @Prop({type:String,unique:true})
    confirmationCode: string

    @Prop({type:Boolean,default:false})
    isBanned: boolean

    @Prop({type:String})
    refresh_token: string
}

export const UserSchema = SchemaFactory.createForClass(User)