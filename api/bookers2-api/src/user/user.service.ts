import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Book, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /* ユーザーのアップデート */
  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hashedPassword;
    return user;
  }

  /* 全ユーザーの取得 */
  getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /* idからユーザーを取得 */
  getUserById(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  getAllUsersWithBooks(): Promise<any> {
    return this.prisma.user.findMany({
      include: { books: true },
    });
  }

  getUserByIdWithBooks(userId: number): Promise<User & { books: Book[] }> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        books: true,
      },
    });
  }
}
