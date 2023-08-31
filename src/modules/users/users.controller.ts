import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseFilters,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/common/filters/HttpExeption.filter';
import { JwtGuard } from 'src/common/guard/jwt-auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UsePipes(ValidationPipe)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @UseGuards(JwtGuard)
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findUserById(@Param('id') userId: string) {
    return await this.userService.findUserById(userId);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userService.updateUser(userId, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUser(userId);
  }

  @Post('change-password/:id')
  async ChangePassword(
    @Param('id') userId: string,
    @Body('newPassword') newPassword: string,
  ): Promise<void> {
    await this.userService.changePassword(userId, newPassword);
  }
}
