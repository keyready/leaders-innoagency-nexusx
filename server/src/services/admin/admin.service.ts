import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Platform } from "src/schemas/platform.schema";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { MailService } from "src/common/services/mail.service";
import { Complaint } from "src/schemas/complaint.schema";
import { generateUniqueId } from "src/utils/utils";
import { Event } from "src/schemas/event.schema";

@Injectable()
export class AdminService{

    constructor(
        // @InjectModel(Platform.name) private readonly platformModel:Model<Platform>,
        @InjectModel(User.name) private readonly userModel:Model<User>,
        // @InjectModel(Complaint.name) private readonly complaintModel:Model<Complaint>,
        @InjectModel(Event.name) private readonly eventModel:Model<Event>,
        private readonly mailService: MailService,
    ){}

    async getAllUsers(paginationUsersDto){
        const {_page,_limit} = paginationUsersDto
        const skip = (_page - 1) * _limit        
        return await this.userModel.find().skip(skip).limit(_limit).exec()
    }
    
    // async banPlatform(complaintId){
    //     const complaint = await this.complaintModel.findById(complaintId)
    //     const platform = await this.platformModel.findOne({_id:complaint.target})

    //     if(complaint.isBanned || platform.isBanned){
    //         throw new BadRequestException({message:'Ошибка'})
    //     }

    //     complaint.isBanned = true
    //     complaint.decision = 'Жалоба принята'
    //     platform.isBanned = true

    //     await complaint.save()
    //     await platform.save()

    //     this.createEvent('Блокировка платформы',null)

    //     return {
    //         complaint,platform
    //     }
    // }

    // async unbanPlatform(complaintId){
    //     const complaint = await this.complaintModel.findById(complaintId)
    //     const platform = await this.platformModel.findOne({_id:complaint.target})

    //     if(!complaint.isBanned || !platform.isBanned){
    //         throw new BadRequestException({message:'Ошибка'})
    //     }

    //     complaint.isBanned = false
    //     complaint.decision = 'Отклонено'
    //     platform.isBanned = false

    //     await complaint.save()
    //     await platform.save()

    //     this.createEvent('Разблокировка платформы',null)

    //     return {
    //         complaint,platform
    //     }
    // }

    async banUser(reqData){
        const {userId,banReason} = reqData
        const user = await this.userModel.findById(userId)
        user.isBanned = true
        await this.mailService.sendMailBannedUser(user.email,banReason)
        this.createEvent('Блокировка пользователя',user)
        return await user.save()
    }

    async unbanUser(userId:string){
        const user = await this.userModel.findById(userId)
        user.isBanned = false
        this.createEvent('Разблокировка пользователя',user)
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

    // async showComplaints(paginationComplaintsDto){
    //     const {_limit,_page} = paginationComplaintsDto
    //     const skip = (_page - 1) * _limit
    //     return await this.complaintModel.find().skip(skip).limit(_limit).exec()
    // }

    async showAllEvents(paginationDto){
        const {_limit,_page} = paginationDto
        const skip = (_page - 1) * _limit
        return await this.eventModel.find().skip(skip).limit(_limit).exec()
    }

    async createEvent(type:string,user:any){
        const event = await new this.eventModel()

        event._id = generateUniqueId()
        event.user = user
        event.name = type
        event.date = new Date()

        await event.save()

        return await this.eventModel.find().exec()
    }

}