import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config();
  app.enableCors({ origin: 'http://localhost:3002' });
  await app.listen(3000);
}
bootstrap();
