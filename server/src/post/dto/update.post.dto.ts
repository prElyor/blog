import {ApiProperty} from "@nestjs/swagger";

export class UpdatePostDto {
    @ApiProperty({example: 'JavaScript лучший язык программирования!', description: 'Содержимые поста'})
    body: string

    @ApiProperty({example: '6276cd229735ee45e3de320c', description: 'id поста!'})
    id: string
}