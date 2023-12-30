import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  getAllBooks(): Promise<Book[]> {
    return this.prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

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

  async createBook(userId: number, dto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        userId,
        ...dto,
      },
    });
    return book;
  }
}
