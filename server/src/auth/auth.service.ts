import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from "bcryptjs"
import {JwtService} from "@nestjs/jwt";

import {User} from "../user/user.entity";
import {CreateUserDto} from "../user/dto/user.create.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {

    // Заинжектим необходимые сервисы
    constructor(private usersService: UserService, private jwtService: JwtService) {
    }

    // Регистрация
    async registration(userDto: CreateUserDto) {

        if(!userDto){
            throw new HttpException('Не отправлены нужные параметры!', HttpStatus.BAD_REQUEST)
        }

        const candidate = await this.usersService.getUserByEmail(userDto.email)

        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 7)

        const user = await this.usersService.createUser({...userDto, password: hashPassword})

        delete user.password

        return user
    }

    // Авторизация
    async login(userDto: CreateUserDto): Promise<any> {
        return this.validateUser(userDto)
    }

    // Генерация токена
    private async generateToken(user: User) {
        const payload = {email: user.email, username: user.username, _id: user._id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    // Валидация пользователя
    private async validateUser(userDto: CreateUserDto) {

        const user = await this.usersService.getUserByEmail(userDto.email)

        if(!user){
            throw new HttpException('Пользователь не найден!', HttpStatus.BAD_REQUEST)
        }

        const isEqualPass = await bcrypt.compare(userDto.password, user.password)

        if ( isEqualPass) {
            const token = await this.generateToken(user)
            const newUser = JSON.parse(JSON.stringify(user))
            delete newUser.password
            return {
                user: newUser,
                token: token.token
            }
        }

        throw new UnauthorizedException('Неправильный email или пароль')
    }

}
