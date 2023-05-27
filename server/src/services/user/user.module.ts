import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from 'src/common/services/mail.service';
import { TemplateService } from 'src/common/services/template.service';
import { Booking, BookingSchema } from 'src/schemas/booking.schema';
import { CommentSchema,Comment } from 'src/schemas/comment.schema';
import { Complaint, ComplaintSchema } from 'src/schemas/complaint.schema';
import { Platform, PlatformSchema } from 'src/schemas/platform.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {name:User.name,schema:UserSchema},
        {name:Platform.name,schema:PlatformSchema},
        {name:Comment.name,schema:CommentSchema},
        {name:Booking.name,schema:BookingSchema},
        {name:Complaint.name,schema:ComplaintSchema}
      ]
    )
  ],
  controllers:[UserController],
  providers: [UserService,MailService,TemplateService]
})
export class UserModule {}
