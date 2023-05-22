import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/common/services/mail.service';
import { Platform } from 'src/schemas/platform.schema';
import { User } from 'src/schemas/user.schema';
import { generateUniqueId } from 'src/utils/utils';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        @InjectModel(Platform.name) private readonly platformModel:Model<Platform>,
        private readonly mailService:MailService  
    ){}
    
    async createBooking(platformId,createBookingDto,cookies){
        const user = await this.userModel.findOne({refresh_token:cookies['refresh_token']})
        const platform = await this.platformModel.findById(platformId)

        platform.freeSpacee=-createBookingDto.selectedPlaces

        const uniqueBookingId = generateUniqueId()

        platform.booking.id = uniqueBookingId
        user.booking.id = uniqueBookingId
        
        platform.booking.userId = user._id
        user.booking.platformId = platformId
        
        user.booking.bookedPlaces = createBookingDto.bookedPlaces
        user.booking.date = createBookingDto.date
        user.booking.startTime = createBookingDto.startTime
        user.booking.endTime = createBookingDto.endTime 
        user.booking.comment = createBookingDto.comment

        platform.booking.date = createBookingDto.date
        platform.booking.bookedPlaces = createBookingDto.bookedPlaces
        platform.booking.startTime = createBookingDto.startTime
        platform.booking.endTime = createBookingDto.endTime
        platform.booking.comment = createBookingDto.comment

        await platform.save()
        await user.save()

        await this.mailService.sendMailInfoBooking(user.email,platform.name,user.firstname,user.lastname,platform.image,platform.booking.startTime,platform.booking.endTime)

        return {
            message:'Бронь успешно завершена'
        }
    }  

    async showMyBooking(refresh_token:string){
        const user = await this.userModel.findOne({refresh_token:refresh_token})
        return await this.platformModel.find({'booking.userId':user._id}).exec();
    }

    async showMyProfile(refresh_token:string){        
        return await this.userModel.findOne({refresh_token:refresh_token})
    }

    async updateMyBooking(updateBookingDto,bookingId){
    }

    async deleteMyBooking(bookingId:string,refresh_token:string){

    }

    async addCommentForCurrentPlatform(createCommentDto){
        const platform = await this.platformModel.findById(createCommentDto.platformId)
        
        platform.comment.id = generateUniqueId()
        platform.comment.body = createCommentDto.body
        platform.comment.rate = createCommentDto.rate
        platform.comment.userId = createCommentDto.userId

        return await platform.save()
    }

    async allCommentsForCurrentPlatform(platformId:string){
        // const platform = await this.platformModel.find(platformId).select()
        
    }


}
