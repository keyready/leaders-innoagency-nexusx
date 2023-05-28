import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationComplaintDto } from "src/entities/pagination-complaint.dto";
import { PaginationUsersDto } from "src/entities/pagination-users.dto";
import { AdminService } from "./admin.service";

@ApiTags('Сервис администратора')
@Controller()
export class AdminController{

    constructor(
        private readonly adminService:AdminService
    ){}

    @Get('/users')
    @ApiOperation({summary:'Просмотр всех пользователей администратором'})
    async getAllUsers(@Query() paginationUsersDto:PaginationUsersDto){        
        return await this.adminService.getAllUsers(paginationUsersDto)
    }

    @Post('/accept_complaint')
    @ApiOperation({summary:'Блокировка платформы'})
    async banPlatform(@Body('complaintId') complaintId:string){
        return await this.adminService.banPlatform(complaintId)
    }

    @Post('/dismiss_complaint')
    @ApiOperation({summary:'Разблокировка платформы'})
    async unbanPlatform(@Body('complaintId') complaintId:string){
        return await this.adminService.unbanPlatform(complaintId)
    }

    @Post('/ban_user')
    @ApiOperation({summary:'Функция бана пользователя'})
    async banUser(@Body() reqData:any){
        return await this.adminService.banUser(reqData)
    }

    @Post('/unban_user')
    @ApiOperation({summary:'Отмена бана для пользователя'})
    async unbanUser(@Body('userId') userId: string){
        return await this.adminService.unbanUser(userId)
    }

    @Post('/updateRoleToOwner')
    @ApiOperation({summary:'Повышение роли до Owner'})
    async updateRoleToOwner(@Body('userId') userId:string){
        return await this.adminService.updateRoleToOwner(userId)
    }

    @Post('/downGradeRoleOwner')
    @ApiOperation({summary:'Понижение роли Owner'})
    async downGradeRoleToOwner(@Body('userId') userId:string){
        return this.adminService.downGradeRoleToOwner(userId)
    }

    @Get('/complaints')
    @ApiOperation({summary:'Просмотр всех жалоб'})
    async showComplaint(@Query() paginationComplaintsDto: PaginationComplaintDto){
        return await this.adminService.showComplaints(paginationComplaintsDto)
    }

}