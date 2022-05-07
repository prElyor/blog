import { Module} from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Posts} from "./post.entity";
import {FilesModule} from "../files/files.module";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";

@Module({
  controllers: [PostController],
  providers: [PostService, UserService],
  imports: [
      TypeOrmModule.forFeature([Posts, User]),
      FilesModule
  ],
})
export class PostModule{

}
