import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Jwt, Msg } from './interface/auth.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  /* ユーザーの新規登録機能 */
  async signUp(dto: AuthDto): Promise<Msg> {
    const hashed = await bcrypt.hash(dto.password, 12);
    // 送られてきたパスワードのハッシュ化
    try {
      await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          hashedPassword: hashed,
        },
      });
      return {
        message: 'ok',
      };
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'このメールアドレスはすでに使用されています',
        );
      }
      throw error;
    }
  }

  /* ログイン機能 */
  async logIn(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new ForbiddenException(
        'メールアドレスが正しくないかパスワードが正しくないです',
      );
    const isValid = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!isValid)
      throw new ForbiddenException(
        'メールアドレスが正しくないかパスワードが正しくないです',
      );
    return this.generateJWT(user.id, user.email);
  }

  /* ログイン時のJWTトークンの生成 */
  async generateJWT(userId: number, email: string): Promise<Jwt> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: '5m',
    });
    return {
      accessToken: token,
    };
  }
}
