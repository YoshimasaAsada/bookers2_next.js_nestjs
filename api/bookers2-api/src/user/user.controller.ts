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

  @Get('my_page')
  getLoginUser(@Req() req: Request): Omit<User, 'hashedPassword'> {
    return req.user;
  }

  @Patch()
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.userService.updateUser(req.user.id, dto);
  }

  @Get()
  getAllUser(@Req() req: Request): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getUserById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<User> {
    return this.userService.getUserById(userId);
  }

  @Get('edit/:id')
  getEditUserById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
