import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { Book } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(@Req() req: Request): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Req() req: Request, @Body() dto: CreateBookDto) {
    return this.bookService.createBook(req.user.id, dto);
  }
}
