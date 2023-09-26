import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, HttpStatus } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { GoogleOAuthGuard } from 'src/common/guard/google-auth/google-oauth.guard';
import { Response } from 'express';
import { UsersService } from '../users/users.service';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async Login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async Register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    // user --> call login function to get accesstoken --> redirect to front-end
    // return this.authService.googleLogin(req);
    // console.log(res);
    const token = await this.authService.googleLogin(req.user);
    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK);
  }
}
