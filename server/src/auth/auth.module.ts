import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      UserModule,
      JwtModule.register({
          secret: process.env.SECRET_JWT_KEY || 'SECRET_KEY',
          signOptions: {
              expiresIn: '12h'
          }
      })
  ]
})
export class AuthModule {}
