import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Platform } from "src/schemas/platform.schema";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { MailService } from "src/common/services/mail.service";

@Injectable()
export class AdminService{

    constructor(
        @InjectModel(Platform.name) private readonly platformModel: Model<Platform>,
        @InjectModel(User.name) private readonly userModel:Model<User>,
        private readonly mailService: MailService
    ){}

    async getAllUsers(){
        return await this.userModel.find().exec()
    }
    
    async bannedUser(id:string){
        const user = await this.userModel.findById(id)
        user.isBanned = true
        await this.mailService.sendMailBannedUser(user.email,'Причина.')
        return await user.save()
    }

    async updateRoleToOwner(userId:string){
        const user = await this.userModel.findByIdAndUpdate(userId,{$push:{roles:['OWNER']}},{new:true})
        return user;
    }

    async downGradeRoleToOwner(userId:string){
        const user = await this.userModel.findByIdAndUpdate(userId,{$pull:{roles:['OWNER']}},{new:true})
        return user;
    }

}