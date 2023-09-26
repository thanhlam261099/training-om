import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/domain/entities';
import { In, Repository } from 'typeorm';
import { CreatePermissionsDto } from './dto/create-permissions.dto';
import { plainToInstance } from 'class-transformer';
import { GetAllPermissionDto } from './dto/get-permission.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}
  async createPermission(createPermissionsDto: CreatePermissionsDto) {
    const { permissionName } = createPermissionsDto;
    const existingName = await this.permissionRepository.findOne({
      where: { permissionName },
    });
    if (existingName) {
      throw new ConflictException('permission name is already exist!');
    }
    const permission = this.permissionRepository.create(createPermissionsDto);
    return this.permissionRepository.save(permission);
  }

  async getAllPermissions(): Promise<GetAllPermissionDto[]> {
    const permission = await this.permissionRepository.find();
    return plainToInstance(GetAllPermissionDto, permission, {
      excludeExtraneousValues: true,
    });
  }

  async getPermissionById(permissionId: string) {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });

    if (!permission) {
      throw new NotFoundException('incorrect permission');
    }

    return permission;
  }

  async deletePermission(permissionId: string) {
    const permission = await this.getPermissionById(permissionId);
    console.log('sẻvice', permission);
    if (!permission) {
      throw new NotFoundException('permission not found');
    }

    await this.permissionRepository.remove(permission);
  }

  async getPermissionsByIds(permissionIds: string[]) {
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(permissionIds),
      },
    });
    return permissions;
  }

  async updatePermission(
    permissionId: string,
    updatePermissionDto: UpdatePermissionDto,
  ) {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });
    if (!permission) {
      throw new NotFoundException('permission not found');
    }

    const { permissionName } = updatePermissionDto;
    const existingPermissionName = await this.permissionRepository.findOne({
      where: { permissionName },
    });

    if (existingPermissionName) {
      throw new ConflictException('Permission name already exist!');
    }

    const permissionUpdate = {
      ...permission,
      ...updatePermissionDto,
    };

    return await this.permissionRepository.save(permissionUpdate);
  }
}
