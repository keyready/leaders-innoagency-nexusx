import { Controller,Post,Body,UploadedFile,UseInterceptors,Get,UseGuards,Param, Req, Res } from '@nestjs/common';
import { ApiTags,ApiOperation } from '@nestjs/swagger/dist';
import { RegisterUserDto } from 'src/entities/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/entities/login-user.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { Response } from '@nestjs/common';
// import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/common/guards/jwt.auth.guard';
import { Request } from 'express';

@ApiTags('Сервис, отвечающий за регистрацию и авторизацию пользователей.')
@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/register')
    @ApiOperation({summary:'Регистрация пользователя'})
    async register(@Body() registerUserDto:RegisterUserDto): Promise<any>{
        return this.authService.register(registerUserDto)                   
    }

    @Post('/login')
    @ApiOperation({summary:'Авторизация пользователя'})
    async login(@Body() loginUserDto:LoginUserDto): Promise<any>{
        return this.authService.login(loginUserDto)
    }

    @Post('/checkEmail')
    @ApiOperation({summary:'Проверка наличия пользователя в БД.'})
    async checkEmail(@Body() requestData){
        return this.authService.checkUser(requestData)
    }

    //-----------------------Яндекс авторизация----------------------------
    @Get('/yandex-login-link')
    @ApiOperation({summary:'Авторизация пользователя при помощи ЯндексID'})
    @UseGuards(AuthGuard('yandex'))
    async yandexAuth(){
        console.log('есть кто?');   
    }

    //TODO - callbackUrl после успешной авторизации. ( Вопрос пароля и токенов )

    //------------------------------------------------------------------------

    @Post('/submit_code')
    @ApiOperation({summary:'Активация по коду.'})
    async submitCode(@Body('code') code:string){
        return this.authService.activateByConfirmCode(code)
    }

    @Post('/logout')
    @ApiOperation({summary:'Выход из системы'})
    async logout(@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return this.authService.logout(token)
    }

    @Post('/change_password')
    @ApiOperation({summary:'Смена пароля пользователя'})
    async changePassword(@Body('newPassword') newPassword: string,@Req() req:Request): Promise<any>{
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return this.authService.changePassword(newPassword,token)
    }

    @Post('/change_profile')
    @ApiOperation({summary:'Изменение профиля'})
    async editProfile(@Body('newProfile') newProfileData,@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return await this.authService.editProfile(newProfileData,token)        
    }

    @Post('/check_old_password')
    async checkOldPassword(@Body('oldPassword') password,@Req() req:Request){
        const token = req.headers.cookie.split('=')[1].split(';')[0]
        return this.authService.checkOldPassword(password,token)
    }

    @Post('/refresh')
    // @UseGuards(JwtGuard)
    @ApiOperation({summary:'Обновление токена'})
    async refresh(@Body('refresh_token') refresh_token:string){
        return this.authService.refresh(refresh_token)
    }

}
