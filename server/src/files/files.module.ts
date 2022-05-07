import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import {CloudinaryModule} from "../cloudinary/cloudinary.module";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [CloudinaryModule]
})
export class FilesModule {}
