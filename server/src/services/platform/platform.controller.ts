import { Body, Controller,Get,Param,Post, Req, UploadedFiles,UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePlatformDto } from 'src/dtos/create-platform.dto';
import { PlatformService } from './platform.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { UploadedFile } from '@nestjs/common';
import { Request } from 'express';
import * as path from 'path'

@ApiTags('Сервис управления платформами и площадками.')
@Controller()
export class PlatformController {

    constructor(
        private readonly platformService:PlatformService
    ){}

    @Get('/platforms')
    @ApiOperation({summary:'Просмотр всех площадок'})
    async getAllPlatforms(): Promise<any>{
        return await this.platformService.getAllPlatforms()
    }
    
    @Get('/platforms/:_id')
    @ApiOperation({summary:'Просмотр конкретной площадки'})
    async getOnePlatform(@Param('_id') id:string,@Req() req:Request){
        console.log(req);
        
        // return await this.platformService.getOnePlatform(id)
    }

    @Post('/')
    //TODO - поменять маршрут
    @ApiOperation({summary:'Создание платформы'})
    @UseInterceptors(FileInterceptor('platformImage_0',{
        storage:diskStorage({
            destination: path.join(__dirname,'..','..','..','static','img','platforms'),
            filename: (req, file, cb) => {
                const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`)}})
    }))
    async createPlatform(@UploadedFile() image,@Body() createPlatformDto:CreatePlatformDto){
        return await this.platformService.createPlatform(createPlatformDto,image)                
    }   
}
