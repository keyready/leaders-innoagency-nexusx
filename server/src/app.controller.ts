import { Controller, Get,Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}

  @Get()
  getMainPage(@Response() res){
    return this.appService.getMainPage(res);
  }
}
  