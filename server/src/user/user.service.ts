import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/user.create.dto";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async createUser(dto: CreateUserDto){
        const candidate = await this.getUserByEmail(dto.email)

        if(candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        return this.userRepository.save(dto)
    }

    async getUserByEmail (email: string){
        return this.userRepository.findOne({where: {email}})
    }

}
