import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

/* ユーザー情報更新 */
// JWTのプロテクションをかける
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login-user')
  getLoginUser(@Req() req: Request): Omit<User, 'hashedPassword'> {
    return req.user;
  }

  @Patch(':id')
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.userService.updateUser(userId, dto);
  }

  @Get()
  async getAllUser(@Req() req: Request): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  @Get(':id')
  async getUserById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<User> {
    return await this.userService.getUserByIdWithBooks(userId);
  }

  @Get('edit/:id')
  getEditUserById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
