import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/common/services/mail.service';
import { Booking } from 'src/schemas/booking.schema';
import { Platform } from 'src/schemas/platform.schema';
import { User } from 'src/schemas/user.schema';
import { Comment } from 'src/schemas/comment.schema';
import { generateUniqueId } from 'src/utils/utils';
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        @InjectModel(Platform.name) private readonly platformModel:Model<Platform>,
        @InjectModel(Booking.name) private readonly bookingModel:Model<Booking>,
        @InjectModel(Comment.name) private readonly commentModel:Model<Comment>,
        private readonly mailService:MailService  
    ){}
    
    async createBooking(platformId,createBookingDto,refresh_token){
        const user = await this.userModel.findOne({refresh_token:refresh_token})
        const platform = await this.platformModel.findById(platformId)

        const newBooking = await new this.bookingModel()

        newBooking._id = generateUniqueId()
        newBooking.userId = user._id
        newBooking.platformId = platformId
        newBooking.date = createBookingDto.date
        newBooking.startTime = createBookingDto.startTime
        newBooking.endTime = createBookingDto.endTime
        newBooking.comment = createBookingDto.comment

        await newBooking.save()

        //TODO - нужно делать проверку на бронь, кол-во свободных мест.

        await this.mailService.sendMailInfoBooking(user.email,platform.title,user.firstname,user.lastname,platform.image,createBookingDto.startTime,createBookingDto.endTime)

        return {
            message:'Бронь успешно завершена'
        }
    }  

    async showMyBooking(refresh_token:string){
        const user = await this.userModel.findOne({refresh_token:refresh_token})
        return await this.bookingModel.findOne({userId:user._id})
    }

    async showMyProfile(refresh_token:string){        
        return await this.userModel.findOne({refresh_token:refresh_token})
    }

    async deleteMyBooking(bookingId:string){
        return await this.bookingModel.findByIdAndRemove({id:bookingId})
    }

    async addCommentForCurrentPlatform(createCommentDto){
        const newComment = await new this.commentModel(createCommentDto)
        newComment._id = generateUniqueId()
        newComment.user = await this.userModel.findOne({_id:createCommentDto.userId})
        await newComment.save()        
        return await this.commentModel.find({platformId:createCommentDto.platformId}).exec()
    }

    async allCommentsForCurrentPlatform(platformId:string){
        return await this.commentModel.find({platformId:platformId})
    }

    async uploadAvatar(image,token){
        const user = await this.userModel.findOne({refresh_token:token})
        // if(user.avatar){
        //     fs.unlinkSync(path.resolve(`static${user.avatar}`))
        // }
        user.avatar = `/img/users/${image.filename}`
        return await user.save()
    }
    
}
