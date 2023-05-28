import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AppService {
  
  getMainPage(res){
    return res.sendFile(join(__dirname,'..','..','client','index.html'))
  }

}
