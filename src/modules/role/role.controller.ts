import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseObject } from 'src/common/dto/respond-object.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { RoleEntity } from 'src/domain/entities';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<ResponseObject<CreateRoleDto>> {
    const result = await this.roleService.createRole(createRoleDto);
    return ResponseObject.success(result);
  }

  @Get()
  async getAllRoles(): Promise<ResponseObject<GetRoleDto[]>> {
    const result = await this.roleService.getAllRoles();
    return ResponseObject.success<GetRoleDto[]>(result, 'ok');
  }
  @Get(':id')
  async getRoleById(
    @Param('id', ParseUUIDPipe) roleId: string,
  ): Promise<ResponseObject<GetRoleDto>> {
    const result = await this.roleService.getRoleById(roleId);
    return ResponseObject.success(result);
  }

  @Put(':id')
  async updateRole(
    @Param('id', ParseUUIDPipe) roleId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ResponseObject<UpdateRoleDto>> {
    const result = await this.roleService.updateRole(roleId, updateRoleDto);
    return ResponseObject.success(result);
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseUUIDPipe) roleId: string) {
    await this.roleService.deleteRole(roleId);
    return ResponseObject.success<null>(null, 'deleted');
  }
}
