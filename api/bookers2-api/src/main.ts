import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// dtoのクラスバリデーションを使うため
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
// クッキーを取り出すために必要
import * as csurf from 'csurf';
// csrfの利用

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* バリデーション使えるようにする */
  // whitelist trueにすることでバリデーションのないものは省く
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  /* corsの設定 */
  app.enableCors({
    credentials: true,
    // 認証情報（クッキーやHTTP認証など）を許可するためのオプション
    origin: ['http://localhost:4000', 'http://localhost'],
  });

  /* cookieの解析 */
  app.use(cookieParser());

  /* csrfを取得し設定 */
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true, // 本番環境ではtrueに設定（HTTPSが必要）
      },
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
