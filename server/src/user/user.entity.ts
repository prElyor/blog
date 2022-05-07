import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { ObjectId } from 'mongodb';

@Entity('user')
export class User {

    @ApiProperty({example: '6275033fe9ce794f20c959b9', description: 'Уникальный идентификатор'})
    @ObjectIdColumn()
    _id: string

    @ApiProperty({example: 'user@example.com', description: 'Email'})
    @Column({type: String, unique: true, nullable: false })
    email: string

    @ApiProperty({example: 'username', description: 'Логин пользователя'})
    @Column({type: String, unique: true, nullable: false })
    username: string

    @ApiProperty({example: 'password', description: 'Пароль пользователя'})
    @Column({type: String })
    @Column()
    password: string

}