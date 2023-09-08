import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import {
  CreatePermissionResDto,
  CreatePermissionsDto,
} from './dto/create-permissions.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseObject } from 'src/common/dto/respond-object.dto';
import {
  GetAllPermissionDto,
  GetPermissionDetailDto,
} from './dto/get-permission.dto';

@Controller('permissions')
@UsePipes(ValidationPipe)
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Post('create')
  async createPermission(
    @Body() createPermissionsDto: CreatePermissionsDto,
  ): Promise<ResponseObject<CreatePermissionResDto>> {
    const result = await this.permissionService.createPermission(
      createPermissionsDto,
    );
    return ResponseObject.success(result, 'Created');
  }

  @Get()
  async getAllPermission(): Promise<ResponseObject<GetAllPermissionDto[]>> {
    const result = await this.permissionService.getAllPermissions();
    return ResponseObject.success<GetAllPermissionDto[]>(
      result,
      'Get all permission successfully',
    );
  }

  @Get(':id')
  async getPermissionById(
    @Param('id', ParseUUIDPipe) permissionId: string,
  ): Promise<ResponseObject<GetPermissionDetailDto>> {
    const result = await this.permissionService.getPermissionById(permissionId);
    return ResponseObject.success(result, 'Ok');
  }

  @Delete(':id')
  async deletePermission(@Param('id', ParseUUIDPipe) permissionId: string) {
    await this.permissionService.deletePermission(permissionId);
    return ResponseObject.success<null>(null, 'Delete permission successfully');
  }

  @Put(':id')
  async updatePermission(
    @Param('id', ParseUUIDPipe) permissionId: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<ResponseObject<CreatePermissionsDto>> {
    const result = await this.permissionService.updatePermission(
      permissionId,
      updatePermissionDto,
    );
    return ResponseObject.success(result, 'Update permission successfully');
  }
}
