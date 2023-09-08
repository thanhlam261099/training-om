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
import { CreateUserDto, CreateUserResDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/common/filters/HttpExeption.filter';
import { JwtGuard } from 'src/common/guard/jwt-auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseObject } from 'src/common/dto/respond-object.dto';
import { GetAllUserDto, GetUserDetailDto } from './dto/get-users.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@UseGuards(JwtGuard)
@UsePipes(ValidationPipe)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseObject<CreateUserResDto>> {
    const result = await this.userService.createUser(createUserDto);
    return ResponseObject.success(result, 'Created');
  }

  @Get()
  async getAllUsers(): Promise<ResponseObject<GetAllUserDto[]>> {
    const result = await this.userService.getAllUsers();
    return ResponseObject.success<GetAllUserDto[]>(result, 'Ok');
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findUserById(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<ResponseObject<GetUserDetailDto>> {
    const result = await this.userService.findUserById(userId);
    return ResponseObject.success(result);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseObject<UpdateUserDto>> {
    const result = await this.userService.updateUser(userId, updateUserDto);
    return ResponseObject.success(result, 'Updated');
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<ResponseObject<null>> {
    await this.userService.deleteUser(userId);
    return ResponseObject.success<null>(null, 'deleted');
  }

  @Put('change-password/:id')
  async changePassword(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ResponseObject<ChangePasswordDto>> {
    await this.userService.changePassword(userId, changePasswordDto);

    return ResponseObject.success(null, 'Password changed');
  }
}
