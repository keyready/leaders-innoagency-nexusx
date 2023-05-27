import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailService } from "src/common/services/mail.service";
import { TemplateService } from "src/common/services/template.service";
import { Complaint, ComplaintSchema } from "src/schemas/complaint.schema";
import { Platform, PlatformSchema } from "src/schemas/platform.schema";
import { User, UserSchema } from "src/schemas/user.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:User.name,schema:UserSchema},
            {name:Platform.name,schema:PlatformSchema},
            {name:Complaint.name,schema:ComplaintSchema}
        ]),
    ],
    providers:[AdminService,MailService,TemplateService],
    controllers:[AdminController]
})
export class AdminModule{}