import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailService } from "src/common/services/mail.service";
import { Platform, PlatformSchema } from "src/schemas/platform.schema";
import { User, UserSchema } from "src/schemas/user.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name,schema:UserSchema},{name:Platform.name,schema:PlatformSchema}]),
    ],
    providers:[AdminService,MailService],
    controllers:[AdminController]
})
export class AdminModule{}