import {Column, Entity, ObjectIdColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.entity";


@Entity('posts')
export class Posts {

    @ApiProperty({example: '6275033fe9ce794f20c959b9', description: 'Уникальный идентификатор'})
    @ObjectIdColumn({type: String})
    _id: any

    @ApiProperty({example: 'Date Fri May 06 2022 22:48:16 GMT+0300 (Москва, стандартное время)', description: 'Дата создания поста', required: false})
    @Column({type: String, default: new Date() })
    createDate?: Date

    @ApiProperty({example: 'Date Fri May 06 2022 22:48:16 GMT+0300 (Москва, стандартное время)', description: 'Дата обновления поста', required: false})
    @Column({type: String, default: new Date() })
    updatedDate?: Date

    @ApiProperty({example: 'JavaScript лучший язык программирования!', description: 'Содержимые поста'})
    @Column({type: String, default: '' })
    body: string

    @ApiProperty({example: 'image.png', description: 'Содержимые поста', required: false})
    @Column({type: String, default: '' })
    media?: string

    @ApiProperty({example: '123456xysz4', description: 'Id медии поста', required: false})
    @Column({type: String, default: '' })
    mediaId?: string

    @ApiProperty({example: 'video', description: 'Тип файла', required: false})
    @Column({type: String, default: '' })
    resourceType?: string


    @ApiProperty({example: 'id автора поста', description: 'Автор поста'})
    @Column({type: String})
    authorId: string

    @ApiProperty({example: 'Автор поста', type: User, description: 'Автор поста'})
    @Column()
    author: User

}