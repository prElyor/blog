import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Posts} from "./post.entity";
import { Repository} from "typeorm";
import {CreatePostDto} from "./dto/create.post.dto";
import {FilesService} from "../files/files.service";
import {UserService} from "../user/user.service";
import {ObjectId} from "mongodb";
import {UpdatePostDto} from "./dto/update.post.dto";
import {User} from "../user/user.entity";

@Injectable()
export class PostService {
    
    constructor(
        @InjectRepository(Posts) private readonly postsRepository: Repository<Posts>,
        private readonly userService: UserService,
        private readonly filesService: FilesService
    ) {}

    async create (dto: CreatePostDto, user, media): Promise<Posts> {
        try {

            const file = await this.filesService.createFile(media)

            const params = {
                body: dto.body,
                author: user,
                authorId: user._id,
                media: file.uri,
                mediaId: file.id,
                resourceType: file.resourceType,
                createDate: new Date(),
                updatedDate: new Date()
            }

            return  this.postsRepository.save(params)

        }catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll (userId: string): Promise<Posts[]> {
        try {

            if(userId){
                const author = await this.userService.getUserById(userId)

                if(!author){
                    throw new BadRequestException('Пользователь с таким id не найден!')
                }

                const id = author._id.toString()

                return this.postsRepository.find({where: {authorId: id}})
            }

          return this.postsRepository.find()

        }catch (e) {
            console.log(e)
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async delete (id: string, authorId: string) {
        try {

            const post = await this.postsRepository.findOne({where: { authorId, _id: new ObjectId(id)}})

            if(!post){
                throw new BadRequestException('Пост не найден!')
            }

            await this.filesService.delete(post.mediaId, post.resourceType)

            await this.postsRepository.delete({authorId: authorId, _id: new ObjectId(id) })

            return {
                message: 'Пост успешно удален!'
            }

        }catch (e) {
            console.log(e)
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    async update (dto: UpdatePostDto, media, user: User) {
        try {

            const post = await this.postsRepository.findOne({where: {_id: new ObjectId(dto.id), authorId: user._id}})

            if(!post){
                throw new Error('Пост не найден!')
            }

            await  this.filesService.delete(post.mediaId, post.resourceType)

            const file = await this.filesService.createFile(media)

            const params = {
                body: dto.body,
                author: user,
                authorId: user._id,
                media: file.uri,
                mediaId: file.id,
                resourceType: file.resourceType,
                createDate: post.createDate,
                updatedDate: new Date()
            }

            return this.postsRepository.save(params)

        }catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}
