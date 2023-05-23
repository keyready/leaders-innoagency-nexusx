import { Body, Controller,Get, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from 'src/dtos/create-booking.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { createCommentDto } from 'src/dtos/create-comment.dto';
import { extname } from 'path';
import * as path from 'path'
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Сервис пользователя')
@Controller()
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Get('/profile')
    @ApiOperation({summary:'Просмотр профиля пользователя.'})
    async showMyProfile(@Req() req:Request){
        return await this.userService.showMyProfile(req.headers.cookie['refresh_token'])
    }

    @Get('/myBooking')
    @ApiOperation({summary:'Просмотр брони пользователя'})
    async showMyBooking(@Req() req:Request){
        return await this.userService.showMyBooking(req.headers.cookie['refresh_token'])
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

    @Get('/comments')
    @ApiOperation({summary:'Получение всех отзывов для конкретной платформы'})
    async allCommentForCurrentPlatform(@Query('platformId') platformId: string){
        return this.userService.allCommentsForCurrentPlatform(platformId) 
    }

    @Post('/comments')
    @ApiOperation({summary:'Создания комментария для платформы'})
    async addCommentForCurrentPlatform(@Body() createCommentForPlatform:createCommentDto){
        return this.userService.addCommentForCurrentPlatform(createCommentForPlatform)   
    }

    @Post('/uploadAvatar')
    @ApiOperation({summary:'Изменение аватарки профиля.'})
    @UseInterceptors(FileInterceptor('avatar',{
        storage:diskStorage({
            destination: path.join(__dirname,'..','..','..','static','img','users'),
            filename: (req, file, cb) => {
                const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`)}})
    }))
    async uploadAvatar(@UploadedFile() image,@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return this.userService.uploadAvatar(image,token)    
    }
}

