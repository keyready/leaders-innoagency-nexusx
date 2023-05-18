import { Controller,Post,Body,UploadedFile,UseInterceptors,Get,UseGuards,Param, Req } from '@nestjs/common';
import { ApiTags,ApiOperation } from '@nestjs/swagger/dist';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

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

    @ApiOperation({summary:'Авторизация пользователя при помощи ЯндексID'})
    //TODO - переписать.


    @Post('/submit_code')
    @ApiOperation({summary:'Активация по коду.'})
    async submitCode(@Body() requestData){
        return this.authService.activateByConfirmCode(requestData)
    }

    @Get('/test')
    @UseGuards(AuthGuard('JWT'))
    async test(@Req() req){
        console.log('я тут');
        
        console.log(req);
        console.log('jwt защитил');
    }

    // @Post('/logout')
    // @ApiOperation({summary:'Выход из системы'})
    // async logout(){
    //     return this.authService.logout()
    // }

    // @Post('/reset')
    // @ApiOperation({summary:'Сброс пароля пользователя'})
    // async reset(@Body() email: string,phoneNumber: string): Promise<any>{
    //     return this.authService.resetPassword(email,phoneNumber)
    // }

    //TODO что получаю? как идентифицировать пользователя?
    // @Post('/changePassword')
    // @ApiOperation({summary:'Смена пароля пользователя'})
    // async changePassword(@Body() id: string,password: string): Promise<any>{
    //     return this.authService.changePassword(id,password)
    // }

}
