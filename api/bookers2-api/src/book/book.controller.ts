import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { Book } from '@prisma/client';
import { UpdateBookDto } from './dto/update-book.dto';

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

  @Get(':id')
  getBook(
    @Req() req: Request,
    @Param('id', ParseIntPipe) bookId: number,
  ): Promise<Book> {
    return this.bookService.getBook(bookId);
  }

  @Patch(':id')
  updateBook(
    @Req() req: Request,
    @Body() dto: UpdateBookDto,
    @Param('id', ParseIntPipe) bookId: number,
  ): Promise<Book> {
    return this.bookService.updateBook(bookId, dto);
  }

  @Delete(':id')
  deleteBook(
    @Req() req: Request,
    @Param('id', ParseIntPipe) bookId: number,
  ): Promise<void> {
    return this.bookService.deleteBook(bookId, req.user.id);
  }

  @Get('edit/:id')
  editBook(
    @Req() req: Request,
    @Param('id', ParseIntPipe) bookId: number,
  ): Promise<Book> {
    return this.bookService.getBook(bookId);
  }
}
