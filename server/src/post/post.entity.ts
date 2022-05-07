import {Column, DeepPartial, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.entity";


@Entity('posts')
export class Posts {

    @ApiProperty({example: '6275033fe9ce794f20c959b9', description: 'Уникальный идентификатор'})
    @ObjectIdColumn({type: String})
    _id: any

    @ApiProperty({example: 'Date Fri May 06 2022 22:48:16 GMT+0300 (Москва, стандартное время)', description: 'Дата создания поста'})
    @Column({type: String, default: new Date() })
    createDate: Date

    @ApiProperty({example: 'Date Fri May 06 2022 22:48:16 GMT+0300 (Москва, стандартное время)', description: 'Дата обновления поста'})
    @Column({type: String, default: new Date() })
    updatedDate: Date

    @ApiProperty({example: 'JavaScript лучший язык программирования!', description: 'Содержимые поста'})
    @Column({type: String, default: '' })
    body: string

    @ApiProperty({example: 'image.png', description: 'Содержимые поста'})
    @Column({type: String, default: '' })
    media: string

    @ApiProperty({example: '123456xysz4', description: 'Id медии поста'})
    @Column({type: String, default: '' })
    mediaId: string

    @ApiProperty({example: 'video', description: 'Тип файла'})
    @Column({type: String, default: '' })
    resourceType: string


    @ApiProperty({example: 'Автор поста', description: 'Автор потса'})
    @Column({type: String})
    authorId: string

    @ApiProperty({example: 'Автор поста', description: 'Автор потса'})
    @Column()
    author: User

}