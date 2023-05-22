import { Body, Controller,Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from 'src/dtos/create-booking.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { createCommentDto } from 'src/dtos/create-comment.dto';

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
        return await this.userService.createBooking(platformId,createBookingDto,req.headers.cookie['refresh_token'])
    }

    @Post('/delete_booking')
    @ApiOperation({summary:'Отмена бронирования'})
    async deleteBooking(@Body('bookingId') bookingId:string){
        return this.userService.deleteMyBooking(bookingId)        
    }

    @Get('/comments')
    @ApiOperation({summary:'Получение всех отзывов для конкретной платформы'})
    async allCommentForCurrentPlatform(@Param('platformId') platformId:string){
        //TODO - массив объектов, где объект - инфо о каждом юзере оставившем коммент.
        return this.userService.allCommentsForCurrentPlatform(platformId)
    }

    @Post('/comments')
    @ApiOperation({summary:'Создания комментария для платформы'})
    async addCommentForCurrentPlatform(@Body() createCommentForPlatform:createCommentDto){
        return this.userService.addCommentForCurrentPlatform(createCommentForPlatform)   
    }
    
}

