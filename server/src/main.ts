import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";
import {ValidationPipe} from "./pipes/validation.pipe";

async function bootstrap() {
  try {

    const PORT = process.env.PORT || 4400;
    const app = await NestFactory.create(AppModule,  { cors: true });

    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
        .setTitle('Blog app api')
        .setDescription(`Documentation for REST API`)
        .setVersion('1.0.0')
        .addTag('Blog app')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    const reflector = app.get(Reflector);

    app.useGlobalGuards(new JwtAuthGuard(new JwtService({}), reflector))
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => {
      console.log(`Server has been started in port ${PORT}`);
    });

  }catch (e) {
    console.log('Server start error', e)
  }
}
bootstrap();
