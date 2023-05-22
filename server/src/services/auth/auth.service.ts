import { Injectable,BadRequestException,UnauthorizedException,InternalServerErrorException, HttpStatus,NotFoundException,HttpException, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/dtos/register-user.dto';

import * as bcrypt from 'bcrypt';

import { generateConfirmationCode, generateUniqueId } from 'src/utils/utils';
import { LoginUserDto } from 'src/dtos/login-user.dto';

import { MailService } from 'src/common/services/mail.service';
import { JwtService } from '@nestjs/jwt';
import { SmscService } from 'src/common/services/sms.service';
@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        private readonly mailService: MailService,
        private readonly jwtService:JwtService,
        private readonly smsServise: SmscService,    
        ){}

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
        const {email, phoneNumber} = requestData
        
        const candidate = await this.userModel.findOne({
            $or:[
                {email:email},
                {phoneNumber:phoneNumber}
            ]
        })

        if(candidate == null){
            const user = await new this.userModel()
            if (email != ''){
                user._id = generateUniqueId()
                user.email = email
                user.phoneNumber = null
                const code = generateConfirmationCode()
                user.confirmationCode = code
                await this.mailService.sendMailConfirmRegister(email,code)
                return await user.save()
            }
            else if(phoneNumber != ''){
                user._id = generateUniqueId()
                user.phoneNumber = phoneNumber
                user.email = null
                const code = generateConfirmationCode()
                user.confirmationCode = code
                //TODO смс на телефон с кодом
                // await this.smsServise.sendSmsForConfirmRegister(phoneNumber,code)
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
        else{
            throw new BadRequestException({message:`Пользователь ${email} в системе уже есть`})
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

            const access_token = await this.jwtService.signAsync({id:user._id,roles:user.roles})
            const refresh_token = await this.jwtService.signAsync({id:user._id})

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
        if(user != null){
            user.isActivated = true
            user.confirmationCode = null
            return await user.save()
        }
        else{
            throw new UnauthorizedException({message:'Неверный код подтверждения активации.Повторите попытку.'})
        }
    }

    async changePassword(newPassword:string,refresh_token:string){
        const user = await this.userModel.findOne({refresh_token:refresh_token})
        if (bcrypt.hashSync(newPassword,5) === user.password){
            throw new BadRequestException({message:'Пароли не должны совпадать'})
        }
        user.password = await bcrypt.hashSync(newPassword,5)
        await this.mailService.sendMailChangePassword(user.email)
        return await user.save()
    }

    async resetPassword(requestData){
        const { email,phoneNumber } = requestData
        const user = await this.userModel.findOne({
            $or:[
                {email:email},
                {phoneNumber:phoneNumber}
            ]
        })
        if(!user){
            throw new BadRequestException({message:'Проверьте правильность введенных данных.'})
        }
        
        user.password = null

        const confirmationCode = generateConfirmationCode()
        user.confirmationCode = confirmationCode

        if(email != ''){
            await this.mailService.sendMailResetPassword(user.email,confirmationCode)
        }

        if(phoneNumber != ''){
            //TODO - смс на телефон с кодом
        }

        await user.save()

        //TODO - вопрос с редиректом.
        return Redirect('/changePassword')
    }   

    async logout(refresh_token){
        const user = await this.userModel.findOne({refresh_token:refresh_token})
        user.refresh_token = null
        return user.save()
    }

    async refresh(refreshToken:string){
        const user = await this.userModel.findOne({refresh_token:refreshToken})
        if(!user){
            throw new UnauthorizedException({message:'Неавторизованный запрос'})
        }
        const ResfreshToken = await this.jwtService.signAsync({id:user._id})
        const access_token = await this.jwtService.signAsync({id:user._id,roles:user.roles})

        user.refresh_token = ResfreshToken 
        await user.save()
        return {
            ...user.toJSON(),
            access_token,
            ResfreshToken
        }
    }

}