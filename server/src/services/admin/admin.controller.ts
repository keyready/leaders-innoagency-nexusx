import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";

@ApiTags('Сервис администратора')
@Controller()
export class AdminController{

    constructor(
        private readonly adminService:AdminService
    ){}

    @Get('/allUsers')
    @ApiOperation({summary:'Просмотр всех пользователей администратором'})
    async getAllUsers(){
        return await this.adminService.getAllUsers()
    }

    @Post('/bannedUser')
    @ApiOperation({summary:'Функция бана пользователя'})
    async bannedUser(@Body('id') id: string){
        return await this.adminService.bannedUser(id)
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