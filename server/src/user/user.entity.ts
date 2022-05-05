import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    email: string

    @Column()
    username: string

    @Column()
    password: string

}