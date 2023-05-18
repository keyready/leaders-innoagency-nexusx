import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthService {
    constructor(private readonly jwtService:JwtService){}

    // async generateAccessToken(payload:any,access_key:string):Promise<string>{
    //     return this.jwtService.signAsync(payload)
    // }

    // async generateRefreshToken(payload:any,refresh_key:string): Promise<string>{
    //     return this.jwtService.signAsync(payload)
    // }

    async generateToken(payload:any):Promise<string>{
        return this.jwtService.signAsync(payload)
    }

    async verifyToken(token:string):Promise<any>{
        return this.jwtService.verifyAsync(token)
    }

    async decodeToken(token:string):Promise<any>{
        return this.jwtService.decode(token)
    }

}