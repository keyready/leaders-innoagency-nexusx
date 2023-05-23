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
    async getOnePlatform(@Param('_id') id:string): Promise<any>{
        console.log(id);
        
        return await this.platformService.getOnePlatform(id)
    }

    // @Post('/')
    // @ApiOperation({summary:'Создание платформы'})
    // @UseInterceptors(FileInterceptor('platformImage_5'))
    // async createPlatform(@UploadedFile() img){
        
    // }

}
