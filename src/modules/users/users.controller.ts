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
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/common/filters/HttpExeption.filter';
import { JwtGuard } from 'src/common/guard/jwt-auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtGuard)
@UsePipes(ValidationPipe)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findUserById(@Param('id', ParseUUIDPipe) userId: string) {
    return await this.userService.findUserById(userId);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userService.updateUser(userId, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) userId: string) {
    return await this.userService.deleteUser(userId);
  }

  @Post('change-password/:id')
  async ChangePassword(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body('newPassword') newPassword: string,
  ): Promise<void> {
    await this.userService.changePassword(userId, newPassword);
  }
}
