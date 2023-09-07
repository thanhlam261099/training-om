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
  Res,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionsDto } from './dto/create-permissions.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
@UsePipes(ValidationPipe)
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Post('create')
  async createPermission(@Body() createPermissionsDto: CreatePermissionsDto) {
    return this.permissionService.createPermission(createPermissionsDto);
  }

  @Get()
  async getAllPermission() {
    return this.permissionService.getAllPermissions();
  }

  @Get(':id')
  async getPermissionById(@Param('id', ParseUUIDPipe) permissionId: string) {
    return await this.permissionService.getPermissionById(permissionId);
  }

  @Delete(':id')
  async deletePermission(@Param('id', ParseUUIDPipe) permissionId: string) {
    return await this.permissionService.deletePermission(permissionId);
  }

  @Put(':id')
  async updatePermission(
    @Param('id') permissionId: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @Res() res,
  ) {
    await this.permissionService.updatePermission(
      permissionId,
      updatePermissionDto,
    );
    return res.status(200).json('Ok');
  }
}
