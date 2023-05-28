import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MailService } from 'src/common/services/mail.service';
import { YandexStrategy } from 'src/common/strategies/yandex.strategy';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
// import { JwtAuthService } from 'src/common/services/jwt.service';
import { SmscService } from 'src/common/services/sms.service';
import { TemplateService } from 'src/common/services/template.service';
import { AdminService } from '../admin/admin.service';
import { EventSchema } from 'src/schemas/event.schema';
import { Event } from 'src/schemas/event.schema';

@Module({
    imports:[
        MongooseModule.forFeature(
            [
                {name:User.name,schema:UserSchema},
                {name:Event.name,schema:EventSchema}
            ]
        ),
        // PassportModule.register({defaultStrategy:'JWT'}),
        // JwtModule.register({
        //     secret:'секрет',
        //     signOptions:{expiresIn:'1d'}
        // })
        PassportModule.register({
            defaultStrategy:'yandex'
        })
    ],
    controllers:[AuthController],
    providers:[
        YandexStrategy,
        AuthService,
        MailService,
        /*JwtStrategy,*/
        SmscService,
        TemplateService,
        AdminService
    ]

})
export class AuthModule {}
