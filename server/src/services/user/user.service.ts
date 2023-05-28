import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/common/services/mail.service';
import { Booking } from 'src/schemas/booking.schema';
import { Platform } from 'src/schemas/platform.schema';
import { User } from 'src/schemas/user.schema';
import { Comment } from 'src/schemas/comment.schema';
import { generateUniqueId, } from 'src/utils/utils';
import * as fs from 'fs'
import * as path from 'path'
import { Complaint } from 'src/schemas/complaint.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        @InjectModel(Platform.name) private readonly platformModel:Model<Platform>,
        @InjectModel(Booking.name) private readonly bookingModel:Model<Booking>,
        @InjectModel(Comment.name) private readonly commentModel:Model<Comment>,
        @InjectModel(Complaint.name) private readonly complaintModel:Model<Complaint>, 
        private readonly mailService:MailService  
    ){}
    
    async updateComplaint(complaintId,updateComplaintDto){
        const complaint = await this.complaintModel.findById(complaintId)
        const user = await this.userModel.findById(complaint.target)
        
        complaint.isBanned = updateComplaintDto.isBanned
        complaint.decision = updateComplaintDto.decision
        
        if(updateComplaintDto.isBanned){
            user.isBanned = true
        }

        await user.save()
        await complaint.save()
        
        return {
            user,complaint
        }
        
    }

    async createBooking(platformId,createBookingDto,refresh_token){

        const user = await this.userModel.findOne({refresh_token:refresh_token})
        const platform = await this.platformModel.findById(platformId)

        const newBooking = await new this.bookingModel()

        if (createBookingDto.bookedPlaces <= 0){
            throw new BadRequestException({message:'Проверьте правильность введенных данных'})
        }
        
        // if(platform.maxGuests < createBookingDto.bookedPlaces || platform.freeSpacee < createBookingDto.bookedPlaces){
        //     throw new BadRequestException({message:`Кол-во желаемых мест ${createBookingDto.bookedPlaces} превышает кол-во допустимых ${platform.freeSpacee}`})
        // }
        
        else{
            platform.freeSpacee-=createBookingDto.bookedPlaces
            await platform.save()
        }

        newBooking._id = generateUniqueId()
        newBooking.userId = user._id
        newBooking.platformTitle = platform.title
        newBooking.date = createBookingDto.date
        newBooking.startTime = createBookingDto.startTime
        newBooking.endTime = createBookingDto.endTime
        newBooking.bookedPlaces = createBookingDto.bookedPlaces
        newBooking.comment = createBookingDto.comment

        await newBooking.save()

        await this.mailService.sendMailInfoBooking(user.email,platform.title,platform.images[0],createBookingDto.startTime,createBookingDto.endTime,createBookingDto.date)

        return {
            message:'Бронь успешно завершена'
        }
    }  

    async showBookings(userId:string){
        return await this.bookingModel.find({userId:userId}).exec()
    }

    async showMyProfile(refresh_token:string){        
        return await this.userModel.findOne({refresh_token:refresh_token})
    }

    async deleteMyBooking(bookingId:string){
        return await this.bookingModel.findByIdAndRemove({id:bookingId})
    }

    async addCommentForCurrentPlatform(createCommentDto){
        const newComment = await new this.commentModel()
        const platform = await this.platformModel.findOne({_id:createCommentDto.platformId})
        
        newComment._id = generateUniqueId()
        newComment.user = await this.userModel.findOne({_id:createCommentDto.userId})
        newComment.platformTitle = platform.title
        newComment.body = createCommentDto.body
        newComment.rate = createCommentDto.rate
        
        await newComment.save()        
        
        return await this.commentModel.find({platformId:createCommentDto.platformId}).exec()
    }

    async uploadAvatar(image,token){
        const user = await this.userModel.findOne({refresh_token:token})
        user.avatar = `/img/users/${image.filename}`
        return await user.save()
    }
    
    async deleteHisCommentForCurrentPlatform(commentId){
        return await this.commentModel.findByIdAndDelete(commentId)
    }

    async showComments(queryObject){
        if (queryObject.userId){
            return this.commentModel.find({'user._id':queryObject.userId}).exec()
        }

        else if(queryObject.platformId){
            const platform = await this.platformModel.findById(queryObject.platformId)
            return await this.commentModel.find({platformTitle:platform.title}).exec()
        }
    }

    async createComplaintForPlatform(createComplaintForPlatformDto){
        const newComplaintPlatform = await new this.complaintModel()

        newComplaintPlatform._id = generateUniqueId()
        newComplaintPlatform.target = createComplaintForPlatformDto.platformId
        newComplaintPlatform.from = createComplaintForPlatformDto.userId
        newComplaintPlatform.comment = createComplaintForPlatformDto.comment
        
        return await newComplaintPlatform.save()
    }

}
