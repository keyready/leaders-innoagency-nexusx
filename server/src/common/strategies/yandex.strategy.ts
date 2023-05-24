import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { User } from 'src/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { generateTemporarilyPassword } from 'src/utils/utils';
import { MailService } from '../services/mail.service';

@ApiTags('Стратегия авторизации через ЯндексID')
@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
    
    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        private readonly configService: ConfigService,
        private readonly mailService:MailService
        ){
            super({
                clientID:'92ce2995432449a28a0d443b1382f8d3',//TODO <-.env
                clientSecret:'47331e854eeb464e8441ed8be2a47978', //TODO <-.env
                callbackURL: 'http://localhost:9999/platforms', //<- change this 
            });
        }

    async validate(access_token:string,refresh_token:string,profile:any) {
        const candidate = await this.userModel.findOne({
            $or:[
                {email:profile._json.emails[0]},
                {phoneNumber:profile._json.default_phone.number}
            ]
        })
        if(!candidate){
            const user = await this.userModel.create({
                email:profile._json.emails[0],
                firstname:profile._json.first_name,
                lastname:profile._json.last_name,
                phoneNumber:profile._json.default_phone.number,
                refresh_token: refresh_token,
                isActivated:true,
                password:generateTemporarilyPassword()
            })
            await this.mailService.sendMailTemporarilyPassword(user.email,user.password)
                
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
