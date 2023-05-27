import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";

@ApiTags('Сервис администратора')
@Controller()
export class AdminController{

    constructor(
        private readonly adminService:AdminService
    ){}

    @Get('/users')
    @ApiOperation({summary:'Просмотр всех пользователей администратором'})
    async getAllUsers(){
        return await this.adminService.getAllUsers()
    }

    @Post('/ban_user')
    @ApiOperation({summary:'Функция бана пользователя'})
    async bannedUser(@Body() reqData:any){
        return await this.adminService.banUser(reqData)
    }

    @Post('/unban_user')
    @ApiOperation({summary:'Отмена бана для пользователя'})
    async unbanUser(@Body('userId') userId: string){
        return await this.adminService.unbanUser(userId)
    }


    @Post('/updateRoleToOwner')
    @ApiOperation({summary:'Повышение роли до Owner'})
    async updateRoleToOwner(@Body('id') userId:string){
        return await this.adminService.updateRoleToOwner(userId)
    }

    @Post('/downGradeRoleOwner')
    @ApiOperation({summary:'Понижение роли Owner'})
    async downGradeRoleToOwner(@Body('id') userId:string){
        return this.adminService.downGradeRoleToOwner(userId)
    }

}