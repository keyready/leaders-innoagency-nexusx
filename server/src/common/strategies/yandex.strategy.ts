import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { User } from 'src/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { generateTemporarilyPassword, generateUniqueId } from 'src/utils/utils';
import { MailService } from '../services/mail.service';
import * as bcrpyt from 'bcrypt'
@ApiTags('Стратегия авторизации через ЯндексID')
@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
    
    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        private readonly configService: ConfigService,
        private readonly mailService:MailService
        ){
            super({
                clientID:'c1688919452843349161a0207d2ac149',
                clientSecret:'1a8671129b2d4886a43517e15ff53d25',
                callbackURL: 'http://localhost:9999/login', //<- change this 
            });
        }

        //yandex_callback

    async validate(access_token:string,refresh_token:string,profile:any) {
        const candidate = await this.userModel.findOne({
            $or:[
                {email:profile._json.emails[0]},
                {phoneNumber:profile._json.default_phone.number}
            ]
        })
        if(!candidate){
            const password = generateTemporarilyPassword()
            const user = await this.userModel.create({
                _id:generateUniqueId(),
                email:profile._json.emails[0],
                firstname:profile._json.first_name,
                lastname:profile._json.last_name,
                phoneNumber:profile._json.default_phone.number,
                refresh_token: refresh_token,
                isActivated:true,
                password:bcrpyt.hashSync(password,5)
            })

            await this.mailService.sendMailTemporarilyPassword(user.email,password)
            return {
                ...user.toJSON(),
                access_token,
                refresh_token,
            }
        }
        else{
            throw new BadRequestException({message:'Данный пользователь уже зарегистрирован.'})
        }
        
    }
}

