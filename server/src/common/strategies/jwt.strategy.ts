import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';

import {UnauthorizedException,NotFoundException,ForbiddenException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { JwtAuthService } from '../services/jwt.service';


@ApiTags('Стратегия JWT-авторизации')
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'JWT'){
    constructor(
        private readonly jwtAuthService: JwtAuthService,
        // private readonly configService: ConfigService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'key'
            // secretOrKey: this.configService.get<string>('SECRET')
        })
    }

    async isAdmin(payload:any): Promise<any>{
        if (!payload.roles.includes('ADMIN')){
            throw new ForbiddenException()
        }
        else{
            true
        }
    }

}