import { Body, Controller,Get, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from 'src/entities/create-booking.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { createCommentDto } from 'src/entities/create-comment.dto';
import { extname } from 'path';
import * as path from 'path'
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateComplaintDto } from 'src/entities/create-complaint.dto';
import { CreateComplaintForPlatformDto } from 'src/entities/create-complaint-for-platform.dto';
@ApiTags('Сервис пользователя')
@Controller()
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    // @Get('/profile')
    // @ApiOperation({summary:'Просмотр профиля пользователя.'})
    // async showMyProfile(@Req() req:Request){
    //     return await this.userService.showMyProfile(req.headers.cookie['refresh_token'])
    // }

    @Get('/bookings')
    @ApiOperation({summary:'Просмотр брони пользователя'})
    async showMyBooking(@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return await this.userService.showMyBooking(token)
    }

    @Get('/bookings')
    @ApiOperation({summary:'Показ всех бронирований для конкретной платформы'})
    async showBookingsForCurrentPlatform(@Query('platformId') plaformId: string){
        return await this.userService.showBookingsForCurrentPlatform(plaformId)
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

    // @Get('/comments')
    // @ApiOperation({summary:'Получение всех отзывов для конкретной платформы'})
    // async allCommentForCurrentPlatform(@Query('platformId') platformId: string){
    //     return this.userService.allCommentsForCurrentPlatform(platformId) 
    // }

    @Post('/comments')
    @ApiOperation({summary:'Создания комментария для платформы'})
    async addCommentForCurrentPlatform(@Body() createCommentForPlatform:createCommentDto){
        console.log(createCommentForPlatform);
        
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
    @UseInterceptors(FileInterceptor('avatar',{
        storage:diskStorage({
            destination: path.resolve('src/static/img/users'),//path.join(__dirname,'static','img','users'),
            filename: (req, file, cb) => {
                const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`)}})
    }))
    async uploadAvatar(@UploadedFile() image,@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return this.userService.uploadAvatar(image,token)    
    }

    @Post('/complaints')
    @ApiOperation({summary:'Создание жалобы на юзера'})
    async createComplaint(@Body() createComplaintDto:CreateComplaintDto){
        return this.userService.createComplaint(createComplaintDto)
    }

    @Post('/submit_complaint')
    @ApiOperation({summary:'Жалоба на платформу'})
    async createComplaintForPlatform(@Body() createComplaintForPlatform:CreateComplaintForPlatformDto){
        return await this.userService.createComplaintForPlatform(createComplaintForPlatform)
    }


}

