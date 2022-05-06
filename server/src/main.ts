import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  try {

    const PORT = process.env.PORT || 4400;
    const app = await NestFactory.create(AppModule,  { cors: true });

    const config = new DocumentBuilder()
        .setTitle('Blog app api')
        .setDescription(`Documentation for REST API`)
        .setVersion('1.0.0')
        .addTag('Blog app')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => {
      console.log(`Server has been started in port ${PORT}`);
    });

  }catch (e) {
    console.log('Server start error', e)
  }
}
bootstrap();
