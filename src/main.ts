import { NestFactory } from '@nestjs/core';
import { ScrapModule } from './scrap.module';

async function bootstrap() {
  const app = await NestFactory.create(ScrapModule);
  await app.listen(3000);
}
bootstrap();
