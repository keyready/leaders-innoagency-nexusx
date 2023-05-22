import { Controller,Post,Body,UploadedFile,UseInterceptors,Get,UseGuards,Param, Req, Res } from '@nestjs/common';
import { ApiTags,ApiOperation } from '@nestjs/swagger/dist';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dtos/login-user.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { Response } from '@nestjs/common';
// import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/common/guards/jwt.auth.guard';

@ApiTags('Сервис, отвечающий за регистрацию и авторизацию пользователей.')
@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/register')
    @ApiOperation({summary:'Регистрация пользователя'})
    // @UseInterceptors(FileInterceptor('image',{
    //     storage:diskStorage({
    //         destination: './static/img/users',
    //         filename: (req, file, cb) => {
    //             const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    //             return cb(null, `${randomName}${extname(file.originalname)}`)}})
    // }))
    async register(@Body() registerUserDto:RegisterUserDto/*,@UploadedFile() image*/): Promise<any>{
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
    async submitCode(@Body() requestData){
        return this.authService.activateByConfirmCode(requestData)
    }

    @Post('/logout')
    @ApiOperation({summary:'Выход из системы'})
    async logout(@Body('refresh_token') refresh_token:string){
        return this.authService.logout(refresh_token)
    }

    @Post('/changePassword')
    @ApiOperation({summary:'Смена пароля пользователя'})
    async changePassword(@Body('newPassword') newPassword: string,@Body('refresh_token') refresh_token:string): Promise<any>{
        return this.authService.changePassword(newPassword,refresh_token)
    }

    @Post('/refresh')
    // @UseGuards(JwtGuard)
    @ApiOperation({summary:'Обновление токена'})
    async refresh(@Body('refresh_token') refresh_token:string){
        return this.authService.refresh(refresh_token)
    }

}
