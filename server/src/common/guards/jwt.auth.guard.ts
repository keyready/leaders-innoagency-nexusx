import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const token = request.headers['authorization']
        
        if (!token) {
            throw new UnauthorizedException({message:'нет токена'});
        }
        try {
            
            const payload = await this.jwtService.verify(
            token,
            {
                secret:this.configService.get<string>('JWT_SECRET')
            }
            );
            request['user'] = payload;
        } catch(e) {
            throw new UnauthorizedException({message:'невалидный токен'});
        }
        return true;
}

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Token' ? token : undefined;
    }
}