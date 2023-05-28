import { Body, Controller,Get, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from 'src/entities/create-booking.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { createCommentDto } from 'src/entities/create-comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateComplaintForPlatformDto } from 'src/entities/create-complaint-for-platform.dto';
import { OptionsFileUpload } from 'src/config/config';
import { UpdateBookingDto } from 'src/entities/update-booking.dto';
@ApiTags('Сервис пользователя')
@Controller()
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Get('/bookings')
    @ApiOperation({summary:'Просмотр брони'})
    async showMyBooking(@Query('userId') userId:string,@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return await this.userService.showBookings(userId)
    }

    @Post('/book_platform')
    @ApiOperation({summary:'Создание бронирования'})
    async createBooking(@Body() createBookingDto:CreateBookingDto,@Body('platformId') platformId:string,@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return await this.userService.createBooking(platformId,createBookingDto,token)
    }

    @Post('/delete_booking')
    @ApiOperation({summary:'Отмена бронирования'})
    async deleteBooking(@Body('bookingId') bookingId:string){
        return this.userService.deleteMyBooking(bookingId)        
    }

    @Post('/comments')
    @ApiOperation({summary:'Создания комментария для платформы'})
    async addCommentForCurrentPlatform(@Body() createCommentForPlatform:createCommentDto){
        return this.userService.addCommentForCurrentPlatform(createCommentForPlatform)   
    }

    @Get('/comments')
    @ApiOperation({summary:'Просмотр своих комментариев'})
    async showComments(@Query() queryObject:any){
        return await this.userService.showComments(queryObject)
    }

    @Post('/delete_comment')
    @ApiOperation({summary:'Удаление комментария'})
    async deleteHisComment(@Body('commentId') commentId: string){
        return await this.userService.deleteHisCommentForCurrentPlatform(commentId)
    }

    @Post('/uploadAvatar')
    @ApiOperation({summary:'Изменение аватарки профиля.'})
    @UseInterceptors(FileInterceptor('avatar',OptionsFileUpload('users')))
    async uploadAvatar(@UploadedFile() image,@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return this.userService.uploadAvatar(image,token)    
    }

    @Post('/submit_complaint')
    @ApiOperation({summary:'Жалоба на платформу'})
    async createComplaintForPlatform(@Body() createComplaintForPlatform:CreateComplaintForPlatformDto){
        return await this.userService.createComplaintForPlatform(createComplaintForPlatform)
    }

    @Post('/make_booking_comment')
    @ApiOperation({summary:'Отзыв о бронировании'})
    async addCommentBookin(@Body() updateBookingDto:UpdateBookingDto){
        return await this.userService.updateComment(updateBookingDto)
    }

}