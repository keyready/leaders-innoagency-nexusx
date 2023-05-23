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
        return await this.platformModel.findOne({_id:id})
    }

    async createPlatform(createPlatformDto,/*image*/){
        
    }

}

