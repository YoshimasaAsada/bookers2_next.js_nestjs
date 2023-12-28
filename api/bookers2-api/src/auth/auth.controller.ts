import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Msg } from './interface/auth.interface';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* 新規登録機能 */
  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    // クライアントから送られてきたリクエストボディのauthdtoの内容を受け取る
    return this.authService.signUp(dto);
  }

  /* ログイン機能 */
  /* ステータスがnestのデフォだと201が帰ってしまうため、変更 */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.logIn(dto);
    // authのlogInでJWTトークンを取得
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    // cookieの名前をaccess_token、jwtトークンはloginでとったものを元にcookieを作成
    return {
      message: 'ok',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logOut(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'ok',
    };
  }
}
