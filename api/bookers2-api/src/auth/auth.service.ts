import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Msg } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  /* ユーザーの新規登録機能 */
  async signUp(dto: AuthDto): Promise<Msg> {
    const hashed = await bcrypt.hash(dto.password, 12);
    // 送られてきたパスワードのハッシュ化
    try {
      await this.prisma.user.create({
        data: {
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
}
