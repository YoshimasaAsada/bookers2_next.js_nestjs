import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookiePaser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* バリデーション使えるようにする */
  // whitelist trueにすることでバリデーションのないものは省く
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  /* corsの設定 */
  app.enableCors({
    credentials: true,
    // 認証情報（クッキーやHTTP認証など）を許可するためのオプション
    origin: ['http://localhost:4000/'],
  });

  app.use(cookiePaser());

  await app.listen(3000);
}
bootstrap();
