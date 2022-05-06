import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      url: process.env.MONGO_DB_URI,
      database: process.env.MONGO_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')]
   }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
