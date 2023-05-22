import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Platform } from 'src/schemas/platform.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class PlatformService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        @InjectModel(Platform.name) private readonly platformModel:Model<Platform>
    ){}

    async getAllPlatforms(){
        return await this.platformModel.find().exec()
    }

    async getOnePlatform(id:string){
        const platform = await this.platformModel.findOne({_id:id})
        console.log(typeof(platform))
        
    }

    async createPlatform(createPlatformDto,image){
        const checkerPlatfromInDB = await this.platformModel.findOne({name:createPlatformDto.name})
        if(checkerPlatfromInDB){
            //TODO проверка на наличие
        }
        const newPlatform = await this.platformModel.create(createPlatformDto)
        newPlatform.image = `/server/static/img/platforms/${image.filename}`
        return await newPlatform.save()
    }

}

