import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService{
    private readonly transporter: nodemailer.Transporter
    
    constructor(
        private readonly configService:ConfigService
    ){
        this.transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true, 
        auth: {
            user: 'NexusX-Team@yandex.ru',
            pass: 'dcymcceiborcuqyh',
        },
        });
    }
    
    async sendMailConfirmRegister(recipientEmail:string,subject: string){
        const infoMsg = await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:recipientEmail,
            subject,
            attachments:[
                {   
                    filename: 'confirmRegister.html',
                    content:'../../../static/templates/confirmRegister.html',
                    contentType: 'text/html'
                }
            ]
        })
    }

    async sendMailConfirmRegisterByYandex(){
        const infoMsg = await this.transporter.sendMail({
            from:this.configService.get<string>('MAIL_SERVICE'),
            to:'k0fanov36@yandex.ru',
            html: '<h1>привет, оно работает</h1>'
        })
        console.log(infoMsg);
    }

}