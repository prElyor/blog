import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {
    ApiBearerAuth, ApiConsumes,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create.post.dto";
import {UserDecorator} from "../user/user.decorator";
import {FileInterceptor} from "@nestjs/platform-express";
import {UpdatePostDto} from "./dto/update.post.dto";
import {User} from "../user/user.entity";
import {Posts} from "./post.entity";

@ApiTags('Посты')
@Controller('post')
export class PostController {

    constructor(private postsService: PostService) {
    }

    @ApiOperation({summary: 'Создание поста'})
    @ApiCreatedResponse({status: 201, type: Posts})
    @ApiUnauthorizedResponse({status: 401, description: 'Не авторизован!'})
    @ApiResponse({status: 400, description: 'Что-то пошло не так!'})
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @Post('/')
    @UseInterceptors(FileInterceptor('media'))
    create(@Body() dto: CreatePostDto, @UploadedFile() media,  @UserDecorator() user) {

        return this.postsService.create(dto, user, media)
    }

    @ApiOperation({summary: 'Получение постов'})
    @ApiResponse({status: 201, type: Posts})
    @ApiResponse({status: 401, type: 'Не авторизован!'})
    @ApiResponse({status: 400, type: 'Что-то пошоло не так!'})
    @ApiBearerAuth()
    @Get('/')
    getAll(@Query('userId') userId: string) {
       return this.postsService.getAll(userId)
    }

    @ApiOperation({summary: 'Удаление постов'})
    @ApiResponse({status: 200, type: 'Пост успешно удален!' })
    @ApiResponse({status: 401, type: 'Не авторизован!'})
    @ApiResponse({status: 400, type: 'Что-то пошоло не так!'})
    @ApiBearerAuth()
    @Delete('/:id')
    delete(@Param('id') id: string, @UserDecorator() user) {
        return this.postsService.delete(id, user._id)
    }

    @ApiOperation({summary: 'Редактировании постов'})
    @ApiResponse({status: 200, type: Posts})
    @ApiResponse({status: 401, type: 'Не авторизован!'})
    @ApiResponse({status: 400, type: 'Что-то пошоло не так!'})
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @Put('/')
    @UseInterceptors(FileInterceptor('media'))
    update(@Body() dto: UpdatePostDto, @UploadedFile() media,  @UserDecorator() user: User) {
        return this.postsService.update(dto, media, user)
    }

}
