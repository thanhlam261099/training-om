import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/common/filters/HttpExeption.filter';
import { ProtectRouteGuard } from 'src/common/guard/protect-route/protect-route.guard';
import { JwtGuard } from 'src/common/guard/jwt-auth/jwt-auth.guard';

// @UseGuards(ProtectRouteGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @UseGuards(JwtGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllUser(): Promise<CreateUserDto[]> {
    return this.userService.getAllUser();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }
}
