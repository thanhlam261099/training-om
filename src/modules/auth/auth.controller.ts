import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { GoogleOAuthGuard } from 'src/common/guard/google-auth/google-oauth.guard';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req, @Response() res) {
    console.log(req);
    res.redirect('localhost:3001');
  }
}
