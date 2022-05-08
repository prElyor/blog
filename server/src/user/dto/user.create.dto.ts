import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Email'})
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({}, {message: 'Инвалид email'})
    readonly email: string

    @ApiProperty({example: 'password1234', description: 'Пароль'})
    @IsString({message: 'Пароль должен быть строкой'})
    @Length(6, 16, {message: 'Длина пароля должна быть не менее 6 и не более 16'})
    readonly password: string

    @ApiProperty({example: 'username', description: 'Username, login'})
    @IsString({message: 'Имя пользователя должно быть строкой'})
    @Length(4, 16, {message: 'Длина имени пользователя должна быть не менее 6 и не более 16'})
    readonly username: string
}