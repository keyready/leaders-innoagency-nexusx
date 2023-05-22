import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class SmscService {
    private baseUrl = 'https://smsc.ru/sys/send.php';

    async sendSmsForConfirmRegister(phoneNumber:string,code:string){
        
        const msgData = {
            login:'NexusX-Team',
            psw:'NexusX-Team@yandex.ru',
            phones: phoneNumber,
            mes:`Ваш код подтверждения ${code}. \n Не передавайте его 3-им лицам.`,
        }


        try{
            const res = await axios(this.baseUrl,{params:msgData})
            console.log('Результат отправки',res.data);
        }        
        catch(e){
            console.error(e.message)
        }    
    }
    
}
