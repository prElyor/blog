import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example: 'JavaScript лучший язык программирования!', description: 'Содержимые поста'})
    body: string
}