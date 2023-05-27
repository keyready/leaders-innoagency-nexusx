import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Platform } from 'src/schemas/platform.schema';
import { User } from 'src/schemas/user.schema';
import { generateUniqueId } from 'src/utils/utils';

@Injectable()
export class PlatformService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        @InjectModel(Platform.name) private readonly platformModel:Model<Platform>
    ){}

    async getAllPlatforms(){
        return await this.platformModel.find().exec()
    }

    async getOnePlatform(id){
        const pl = await this.platformModel.findOne({_id:id})
        return pl                
    }

    async createPlatform(createPlatformDto,image){
        const platform = await new this.platformModel()
        
        platform._id = generateUniqueId()
        platform.title = createPlatformDto.title
        platform.address = createPlatformDto.address
        platform.maxGuests = createPlatformDto.maxGuests
        platform.freeSpacee = createPlatformDto.maxGuests
        platform.description = createPlatformDto.description
        platform.restrictions.push(createPlatformDto.restriction_0)
        platform.images.push(`/img/platforms/${image.filename}`)
        
        return await platform.save() 
    }

}

