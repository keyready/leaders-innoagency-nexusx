import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path'
import { TemplateService } from "./template.service";


@Injectable()
export class MailService{
    private readonly transporter: nodemailer.Transporter
    constructor(
        private readonly configService:ConfigService,
        private readonly templateService: TemplateService
    ){
        this.transporter = nodemailer.createTransport({
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<string>('SMTP_PORT'),
        secure: true, 
        auth: {
            user:this.configService.get<string>('MAIL_SERVICE'),
            pass:this.configService.get<string>('MAIL_PASSWORD')
        },
        });
    }
    
    async sendMailConfirmRegister(recipientEmail:string,user:any){

        const type = 'confirmCode'

        // const htmlContent = fs.readFileSync(path.resolve(`static/letters/${type}/index.hbs`))

        const htmlContent = await this.templateService.renderTemplateWithData(path.resolve(`src/static/letters/${type}/index.hbs`),
        {
            code:user.code,
            email:user.email,
            phoneNumber:user.phoneNumber,
            firstname: user.firstname
        }
    )

        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Подтверждение регистрации',
            // text:`Ваш код подтверждения ${code}. \n Не передавайте его 3-им лицам.`,
            html:htmlContent,
            // attachments:[
            //     {filename:'style.css',path:path.resolve(`src/static/letters/${type}/style.css`)},
            //     {filename:'logo.svg',path:path.resolve(`src/static/letters/${type}/logo.svg`)},
            //     {filename:'logo_container.svg',path:path.resolve(`src/static/letters/${type}/logo_container.svg`)}
            // ]
        })
    }

    async sendMailBannedUser(recipientEmail:string,reason:string){
        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Блокировка пользователя',
            text:`Причина вашей блокировки ${reason}`
        })
    }

    async sendMailChangePassword(recipientEmail:string){
        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Смена пароля',
            text:'Ваш пароль был успешно изменен.'
        })
    }

    async sendMailResetPassword(recipientEmail:string,code:string){
        await this.transporter.sendMail({
            from: this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Код для сброса',
            text:`Код для сброса пароля ${code}. Не передавайте его 3-им лицам.`
        })
    }

    async sendMailInfoBooking(recipientEmail:string,platformName:string,firstname:string,lastname:string,image:string,startTime:Date,endTime:Date){
        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Информация о бронировании',
            text:`Уважаемый/ая ${firstname} ${lastname}. Вы оформили бронирование ${platformName} на период с ${startTime} по ${endTime}`,
            attachments: [
                {
                    filename: `${image}`, 
                    path: path.resolve(`static${image}`) 
                }
            ]
        })
    }

    async sendMailTemporarilyPassword(recipientEmail:string,password:string){
        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Временный пароль',
            text:`Ваш временый пароль ${password}`
        })
    }

}