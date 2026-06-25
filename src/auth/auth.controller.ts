import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Cookie
  @Get('set-cookie')
  setCookie(@Res() res: any) {
    res.cookie('username', 'dung');
    return res.send('Đã gửi cookie');
  }

  @Get('get-cookie')
  getCookie(@Req() req: any) {
    return {
      cookies: req.cookies,
    };
  }

  @Get('clear-cookie')
  clearCookie(@Res() res: any) {
    res.clearCookie('username');
    return res.send('Đã xóa cookie');
  }

  // Session
  @Get('set-session')
  setSession(@Session() session: Record<string, any>) {
    session.username = 'dung';
    return {
      message: 'Đã lưu session',
      session,
    };
  }

  @Get('get-session')
  getSession(@Session() session: Record<string, any>) {
    return {
      session,
    };
  }

  // JWT Login
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(username, password);
  }

  // API cần đăng nhập
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return {
      message: 'API này đã được bảo vệ bằng JWT',
      user: req.user,
    };
  }

  // Authorization theo role
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  getAdmin(@Req() req: any) {
    if (req.user.role !== 'admin') {
      return {
        message: 'Bạn không có quyền admin',
      };
    }

    return {
      message: 'Chào admin',
      user: req.user,
    };
  }
}
