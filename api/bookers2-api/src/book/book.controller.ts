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
import { Book, User } from '@prisma/client';
import { UpdateBookDto } from './dto/update-book.dto';
import { UserService } from 'src/user/user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @Get()
  // getAllBooks(@Req() req: Request): Promise<Book[]> {
  //   return this.bookService.getAllBooks();
  // }
  // ログインユーザーの情報もとってきたいから下のものに変更。最適かどうかは後で見る

  // @Get()
  // async getAllBooks(@Req() req: Request): Promise<any> {
  //   const [allBooks, userById] = await Promise.all([
  //     this.bookService.getAllBooks().then((result) => ({ allBooks: result })),
  //     req.user,
  //   ]);
  //   return {
  //     ...allBooks,
  //     currentUser: req.user,
  //   };
  // }

  @Get()
  async getAllBooks(
    @Req() req: Request,
  ): Promise<{ allBooks: Book[]; currentUser: Omit<User, 'hashedPassword'> }> {
    const allBooks = await this.bookService.getAllBooksWithUser();
    return {
      allBooks,
      currentUser: req.user,
    };
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
    return this.bookService.getBookByIdWithUser(bookId);
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
