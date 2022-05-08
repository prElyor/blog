import {ApiProperty} from "@nestjs/swagger";
import {IsString, MinLength} from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: 'JavaScript лучший язык программирования!', description: 'Содержимые поста'})
    @IsString({message: 'Сообщение должно быть строкой'})
    @MinLength(2, {message: 'Длина сообщения должна быть не менее 2'})
    body: string

    @ApiProperty({example: 'Файл', description: 'Любой файл', required: false, format: 'binary'})
    media?: any

}