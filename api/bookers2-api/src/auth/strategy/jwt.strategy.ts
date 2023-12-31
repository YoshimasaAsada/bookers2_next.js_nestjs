// /* jwtのカスタマイズ */
// /* ここでやっているのはjwtの復元？？ */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // PassportStrategyは抽象クラスになっているので、定義する
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    // ここでjwtからpayloadを復元
    super({
      /* リクエストのどこにjwtが格納されているかを指定する必要がある */
      // リクエストからJWTを取り出して、cookieを取り出し、jwtを返す
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['access_token'];
          }
          return jwt;
        },
      ]),
      ignoreExpiration: false,
      // jwtの有効期限が切れている場合はアウトにする
      secretOrKey: config.get('JWT_SECRET'),
      // シークレットのキー指定
    });
  }

  // 復元したものをvalidateに渡している
  async validate(payload: { sub: number; email: string }) {
    // ここのpayloadはjwtの生成に使用したもの。
    // Jwtはpayloadとシークレットキーをアルゴリズムにかけることで生成される。
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hashedPassword;
    return { currentUser: user };
    // ここのユーザーはjwtを解析した結果のユーザーなので、
    // ログインしているユーザーのものが返ってくる
  }
}
