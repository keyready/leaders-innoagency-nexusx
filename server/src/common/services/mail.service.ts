import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path'
import { TemplateService } from "./template.service";
import { formatDate, formatTime,  } from "src/utils/utils";

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
    
    //TODO - в идеале бы вынести все типы сообщений в отдельную сущность, и извлекать при отправки нового типа.

    async sendMailConfirmRegister(recipientEmail:string,code:string){
        const cssContent = fs.readFileSync(path.resolve('src/static/emailTemplates/confirmCode/style.css'))
        const htmlContent = await this.templateService.renderTemplateWithData(path.resolve(`src/static/emailTemplates/confirmCode/index.hbs`),
        {
            code:code,
            css:cssContent
        }
    )

        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Подтверждение регистрации',
            html:htmlContent
        })
    }

    async sendMailActivatedUser(recipientEmail:string){
        const cssContent = fs.readFileSync(path.resolve('src/static/emailTemplates/userActivated/style.css'))
        const htmlContent = await this.templateService.renderTemplateWithData(path.resolve('src/static/emailTemplates/userActivated/index.hbs'),{
            css:cssContent,
            href:this.configService.get<string>('BASE_URL')
        })

        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Успешная активация профиля',
            html:htmlContent
        })

    } 

    async sendMailBannedUser(recipientEmail:string,reason:string){
        const cssContent = fs.readFileSync(path.resolve('src/static/emailTemplates/banUser/style.css'))
        const htmlContent = await this.templateService.renderTemplateWithData(path.resolve('src/static/emailTemplates/banUser/index.hbs'),{
            css:cssContent,
            reason:reason
        }) 

        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Блокировка пользователя',
            html:htmlContent
        })
    }

    async sendMailChangePassword(recipientEmail:string){
        const cssContent = fs.readFileSync(path.resolve('src/static/emailTemplates/changePassword/style.css'))
        const htmlContent = await this.templateService.renderTemplateWithData(path.resolve('src/static/emailTemplates/changePassword/index.hbs'),{
            css:cssContent
        })

        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Смена пароля',
            html:htmlContent
        })
    }

    async sendMailResetPassword(recipientEmail:string,code:string){
        const cssContent = fs.readFileSync(path.resolve('src/static/emailTemplates/resetPassword/style.css'))
        const htmlContent = await this.templateService.renderTemplateWithData(path.resolve('src/static/emailTemplates/resetPassword/index.hbs'),{
            css:cssContent,
            code:code
        })

        await this.transporter.sendMail({
            from: this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Код для сброса пароля',
            html:htmlContent
        })
    }

    async sendMailInfoBooking(recipientEmail:string,platformName:string,platformImage:string,startTime,endTime,date){
        const cssContent = fs.readFileSync(path.resolve('src/static/emailTemplates/createBooking/style.css'))

        const fTime = formatTime(startTime);
        const eTime = formatTime(endTime);
        const d = formatDate(date)
        
        const htmlContent = await this.templateService.renderTemplateWithData(path.resolve('src/static/emailTemplates/createBooking/index.hbs'),{
            css:cssContent,
            date:d,
            startTime:fTime,
            endTime: eTime,
            platformName:platformName
        })


        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Информация о созданом бронировании',
            html:htmlContent,
            attachments: [
                {
                    filename: platformImage.split('/')[3],
                    path: path.resolve(`src/static${platformImage}`),
                    cid: 'booking'
                }
            ]
        })
    }

    async sendMailTemporarilyPassword(recipientEmail:string,password:string){
        const cssContent = fs.readFileSync(path.resolve('src/static/emailTemplates/tmpPassword/style.css'))
        const htmlContent = await this.templateService.renderTemplateWithData(path.resolve('src/static/emailTemplates/tmpPassword/index.hbs'),{
            css:cssContent,
            tmpPassword:password
        })

        await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject:'Временный пароль',
            html:htmlContent
        })
    }

}