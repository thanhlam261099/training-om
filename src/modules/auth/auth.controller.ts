import {
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { LocalAuthGuard } from 'src/common/guard/local-auth/local-auth.guard';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
// import { JwtGuard } from 'src/common/guard/jwt-auth/jwt-auth.guard';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async Login(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto.email, loginDto.password);
  }

  @Post('register')
  async Register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}
