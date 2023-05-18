import { Injectable,BadRequestException,UnauthorizedException,InternalServerErrorException, HttpStatus,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/dtos/register-user.dto';

import * as bcrypt from 'bcrypt';

import { generateConfirmationCode } from 'src/utils/utils';
import { LoginUserDto } from 'src/dtos/login-user.dto';

import { MailService } from 'src/common/services/mail.service';
import { JwtAuthService } from 'src/common/services/jwt.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        private readonly mailService: MailService,
        private readonly jwtService: JwtAuthService,
        ){}
        // private readonly smsServise: SmsService,    

    async register(registerUserDto: RegisterUserDto){
        const user = await this.userModel.findOne({
            $or:[
                {email:registerUserDto.email},
                {phoneNumber:registerUserDto.phoneNumber}
            ]
        })
        user.firstname = registerUserDto.name
        user.lastname = registerUserDto.lastname
        user.password = bcrypt.hashSync(registerUserDto.password,5)
        user.dateOfBirth = registerUserDto.dateOfBirth
        return await user.save()
    }
    
    async checkUser(requestData){
        let {email, phoneNumber} = requestData

        const candidate = await this.userModel.findOne({
            $or:[
                {email:email},
                {phoneNumber:phoneNumber}
            ]
        })

        if(candidate == null){
            const user = await new this.userModel()
            if (email != ''){
                user.email = email
                user.confirmationCode = generateConfirmationCode()
                //TODO сообщение на почту с кодом.
                return await user.save()
            }
            else if(phoneNumber != ''){
                user.phoneNumber = phoneNumber
                user.confirmationCode = generateConfirmationCode()
                //TODO смс на телефон с кодом
                return await user.save()
            }
        }
        else if (email != '' && candidate.email == null && candidate.isActivated && candidate.phoneNumber != null){
            candidate.email = email
            return await candidate.save()
        }
        else if (phoneNumber != '' && candidate.phoneNumber == null && candidate.isActivated && candidate.email != null){
            candidate.phoneNumber = phoneNumber
            return await candidate.save()
        }
    }

    async login(loginUserDto:LoginUserDto){
        const user = await this.userModel.findOne({
            $or:[
                {email:loginUserDto.email},
                {phoneNumber:loginUserDto.phoneNumber}
            ]
        })
        if(!user || !bcrypt.compareSync(loginUserDto.password,user.password)){
            throw new NotFoundException({message:'Проверьте правильность введенных данных.'})
        }
        else if(!user.isActivated){
            throw new UnauthorizedException({message:'Профиль не активирован. Проверьте вашу почту или телефон'})
        }
        else{
            const access_token = await this.jwtService.generateToken({id:user._id,roles:user.roles})
            const refresh_token = await this.jwtService.generateToken({id:user._id,roles:user.roles})

            user.refresh_token = refresh_token
            await user.save()

            return {
                ...user.toJSON(),
                access_token,
                refresh_token
            }
        }
    }
    
    async activateByConfirmCode(requestData){
        const {code} = requestData
        const user = await this.userModel.findOne({confirmationCode:code})
        if(user){
            //TODO Фикс бага с выполнением дважды.
            user.isActivated = true
            user.confirmationCode = null
            return await user.save()
        }
        else{
            throw new UnauthorizedException({message:'Неверный код подтверждения активации.Повторите попытку.'})
        }
    }

    // async resetPassword(email:string,phoneNumber:string){
    //     if(email != ''){
    //         const user = await this.userModel.findOne({email:email})

    //     }
    //     if(phoneNumber != ''){
    //         const user = await this.userModel.findOne({phoneNumber:phoneNumber})

    //     }
    // }

    // async changePassword(id:string,newPassword:string){
    //     const user = await this.userModel.findById(id).exec()
    //     if(bcrypt.compareSync(newPassword,user.password)){
    //         user.password = bcrypt.hashSync(newPassword,5)
    //         /*TODO почта о смене пароля */
    //         return user.save()
    //     }
    //     else{
    //         throw new UnauthorizedException({message: 'Новый пароль не должен совпадать со старым'})
    //     }
    // }


}


