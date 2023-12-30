import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  /* 全ての本の情報を取得 */
  getAllBooks(): Promise<Book[]> {
    return this.prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /* ログインしている本の情報を取得 */
  getLoginUserBooks(userId: number): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /* IDヒットした本の情報の取得 */
  getBook(bookId: number): Promise<Book> {
    return this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
  }

  /* 本の新規登録 */
  async createBook(userId: number, dto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        userId,
        ...dto,
      },
    });
    return book;
  }

  /* 本のアップデート機能 */
  async updateBook(bookId: number, dto: UpdateBookDto): Promise<Book> {
    const book = await this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        ...dto,
      },
    });
    return book;
  }

  /* 本の削除機能 */
  async deleteBook(bookId: number, userId: number): Promise<void> {
    // なんでvoid??
    const book = await this.prisma.book.delete({
      where: {
        id: bookId,
      },
    });
  }
}
