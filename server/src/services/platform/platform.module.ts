import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Platform, PlatformSchema } from 'src/schemas/platform.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:Platform.name,schema:PlatformSchema},
            {name:User.name,schema:UserSchema}
        ]),
    ],
    controllers:[PlatformController],
    providers:[PlatformService]
})
export class PlatformModule {}
