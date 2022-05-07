import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOperation} from "@nestjs/swagger";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create.post.dto";
import {UserDecorator} from "../user/user.decorator";
import {FileInterceptor} from "@nestjs/platform-express";
import {ObjectID} from "typeorm";
import {UpdatePostDto} from "./dto/update.post.dto";
import {User} from "../user/user.entity";

@Controller('api/post')
export class PostController {

    constructor(private postsService: PostService) {
    }

    @ApiOperation({summary: 'Создание поста'})
    @Post('/')
    @UseInterceptors(FileInterceptor('media'))
    create(@Body() dto: CreatePostDto, @UploadedFile() media,  @UserDecorator() user) {

        return this.postsService.create(dto, user, media)
    }

    @ApiOperation({summary: 'Получение постов'})
    @Get('/')
    getAll(@Query('userId') userId: string) {
       return this.postsService.getAll(userId)
    }

    @ApiOperation({summary: 'Получение постов'})
    @Delete('/:id')
    delete(@Param('id') id: string, @UserDecorator() user) {
        return this.postsService.delete(id, user._id)
    }

    @ApiOperation({summary: 'Получение постов'})
    @Put('/')
    @UseInterceptors(FileInterceptor('media'))
    update(@Body() dto: UpdatePostDto, @UploadedFile() media,  @UserDecorator() user: User) {
        return this.postsService.update(dto, media, user)
    }

}
