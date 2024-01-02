import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLogInDto, AuthSignUpDto } from './dto/auth.dto';
import { Csrf, Msg } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
    // csrfToken()ないよ的なエラーが出たら型インストール必要
  }

  /* 新規登録機能 */
  @Post('signup')
  signUp(@Body() dto: AuthSignUpDto): Promise<Msg> {
    // クライアントから送られてきたリクエストボディのauthdtoの内容を受け取る
    return this.authService.signUp(dto);
  }

  /* ログイン機能 */
  /* ステータスがnestのデフォだと201が帰ってしまうため、変更 */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Body() dto: AuthLogInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.logIn(dto);
    // authのlogInでJWTトークンを取得
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: true,
      // frontからだとtrue,postmanからだとfalse出ないとだめ？
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
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'ok',
    };
  }
}
