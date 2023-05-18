import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>
    ){}

    async profile(){
        const user = await this.userModel.findOne({})
        return user.toJSON()
    }

}
