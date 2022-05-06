import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/user.create.dto";

@ApiTags('Авторизация')
@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Регистрация'})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: 'Авторизация'})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

}
