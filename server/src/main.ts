import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {

    const PORT = process.env.PORT || 4400;
    const app = await NestFactory.create(AppModule,  { cors: true });

    await app.listen(PORT, () => {
      console.log(`Server has been started in port ${PORT}`);
    });

  }catch (e) {
    console.log('Server start error', e)
  }
}
bootstrap();
