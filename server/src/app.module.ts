import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { AuthModule } from './services/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from './services/platform/platform.module';
import { UserModule } from './services/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/leaders_innoagency'),
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','..','client')
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule,
    PlatformModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
