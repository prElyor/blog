import {createParamDecorator, ExecutionContext, HttpException, HttpStatus} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

export const UserDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {

        try {

            const req = ctx.switchToHttp().getRequest();

            const token = req.headers.authorization.split(' ')[1]

            const jwtService = new JwtService({
                secret: process.env.SECRET_JWT_KEY || 'SECRET_KEY',
                signOptions: {
                    expiresIn: '1h'
                }
            })

            const user = jwtService.verify(token)

            delete user.iat
            delete user.exp

            return user

        }catch (e) {
            throw new HttpException({message: e}, HttpStatus.UNAUTHORIZED)
        }

    },
);