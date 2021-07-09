import { NestFactory } from '@nestjs/core';
import { AcademyModule } from './academy/academy.module';

async function bootstrap() {
  const usersapp = await NestFactory.create(AcademyModule);
  await usersapp.listen(3001);
}
bootstrap();
