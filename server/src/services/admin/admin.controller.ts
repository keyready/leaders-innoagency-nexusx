import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/entities/pagination.dto";
import { AdminService } from "./admin.service";

@ApiTags('Сервис администратора')
@Controller()
export class AdminController{

    constructor(
        private readonly adminService:AdminService
    ){}

    @Get('/users')
    @ApiOperation({summary:'Просмотр всех пользователей администратором'})
    async getAllUsers(@Query() paginationDto:PaginationDto){        
        return await this.adminService.getAllUsers(paginationDto)
    }

    // @Post('/accept_complaint')
    // @ApiOperation({summary:'Блокировка платформы'})
    // async banPlatform(@Body('complaintId') complaintId:string){
    //     return await this.adminService.banPlatform(complaintId)
    // }

    // @Post('/dismiss_complaint')
    // @ApiOperation({summary:'Разблокировка платформы'})
    // async unbanPlatform(@Body('complaintId') complaintId:string){
    //     return await this.adminService.unbanPlatform(complaintId)
    // }

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

    @Post('/upgrade_user')
    @ApiOperation({summary:'Повышение роли до Owner'})
    async updateRoleToOwner(@Body('userId') userId:string){
        return await this.adminService.updateRoleToOwner(userId)
    }

    @Post('/downgrade_user')
    @ApiOperation({summary:'Понижение роли Owner'})
    async downGradeRoleToOwner(@Body('userId') userId:string){
        return this.adminService.downGradeRoleToOwner(userId)
    }

    // @Get('/complaints')
    // @ApiOperation({summary:'Просмотр всех жалоб'})
    // async showComplaint(@Query() paginationDto: PaginationDto){
    //     return await this.adminService.showComplaints(paginationDto)
    // }

    @Get('/events')
    @ApiOperation({summary:'Просмотр всех событий на сайте'})
    async showAllEvents(@Query() paginationDto:PaginationDto){
        return await this.adminService.showAllEvents(paginationDto)
    }

}