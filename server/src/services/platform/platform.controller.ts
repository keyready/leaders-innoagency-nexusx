import { Body, Controller,Get,Param,Post, Req, UploadedFiles,UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePlatformDto } from 'src/dtos/create-platform.dto';
import { PlatformService } from './platform.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';

import { Request } from '@nestjs/common';
import { CreateBookingDto } from 'src/dtos/create-booking.dto';
import { ObjectId } from 'mongoose';

@ApiTags('Сервис управления платформами и площадками.')
@Controller()
export class PlatformController {

    constructor(
        private readonly platformService:PlatformService
    ){}

    @Get('/platforms')
    @ApiOperation({summary:'Просмотр всех площадок'})
    async getAllPlatforms(){
        return await this.platformService.getAllPlatforms()
    }
    
    @Get('/platform/:id')
    @ApiOperation({summary:'Просмотр конкретной площадки'})
    async getOnePlatform(@Param('id') id: ObjectId){
        return await this.platformService.getOnePlatform(id)
    }

    @Post('/createPlatform')
    @ApiOperation({summary:'Создание платформы'})
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination: './static/img/platforms',
            filename: (req, file, cb) => {
                const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`)}})
    }))
    async createPlatform(@Body() createPlatformDto:CreatePlatformDto,/*@UploadedFiles() files: */ @UploadedFiles() image): Promise<any>{
        return this.platformService.createPlatform(createPlatformDto,image)
    }

}
