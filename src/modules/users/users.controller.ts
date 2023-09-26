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
import { RolesGuard } from 'src/common/guard/role-guard/role.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Permission } from 'src/common/constants/constants';

@Controller('users')
// @UseGuards(JwtGuard, RolesGuard)
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

  // @Permissions(Permission.READ_USER)
  @Get()
  async getAllUsers(): Promise<ResponseObject<GetAllUserDto[]>> {
    const result = await this.userService.getAllUsers();
    return ResponseObject.success<GetAllUserDto[]>(result, 'Ok');
  }

  @Permissions(Permission.READ_USER)
  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findUserById(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<ResponseObject<GetUserDetailDto>> {
    const result = await this.userService.findUserById(userId);
    return ResponseObject.success(result);
  }

  @Permissions(Permission.UPDATE_USER)
  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseObject<UpdateUserDto>> {
    const result = await this.userService.updateUser(userId, updateUserDto);
    return ResponseObject.success(result, 'Updated');
  }

  @Permissions(Permission.DELETE_USER)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<ResponseObject<null>> {
    await this.userService.deleteUser(userId);
    return ResponseObject.success<null>(null, 'deleted');
  }

  @Permissions(Permission.UPDATE_USER)
  @Put('change-password/:id')
  async changePassword(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ResponseObject<ChangePasswordDto>> {
    await this.userService.changePassword(userId, changePasswordDto);

    return ResponseObject.success(null, 'Password changed');
  }
}
