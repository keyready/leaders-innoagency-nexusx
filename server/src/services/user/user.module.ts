import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from 'src/common/services/mail.service';
import { Booking, BookingSchema } from 'src/schemas/booking.schema';
import { CommentSchema,Comment } from 'src/schemas/comment.schema';
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
        {name:Booking.name,schema:BookingSchema}
      ]
    )
  ],
  controllers:[UserController],
  providers: [UserService,MailService]
})
export class UserModule {}
