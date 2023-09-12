import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/domain/entities';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionsService } from '../permissions/permissions.service';
import { GetRoleDto } from './dto/get-role.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly permissionService: PermissionsService,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const { roleName, description, permissions } = createRoleDto;

    const existingRole = await this.roleRepository.findOne({
      where: { roleName },
    });
    if (existingRole) {
      throw new ConflictException('Role name already exists!');
    }

    const role = new RoleEntity();
    const list = permissions.map((ele) => ele.id);
    const permissionList = await this.permissionService.getPermissionsByIds(
      list,
    );
    role.roleName = roleName;
    role.description = description;
    role.permissions = permissionList;

    const result = this.roleRepository.create(role);
    return await this.roleRepository.save(result);
  }

  async getAllRoles(): Promise<GetRoleDto[]> {
    const roles = await this.roleRepository.find({
      relations: {
        permissions: true,
      },
    });
    return plainToInstance(GetRoleDto, roles, {
      excludeExtraneousValues: true,
    });
  }

  async getRoleById(roleId: string): Promise<GetRoleDto> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return plainToInstance(GetRoleDto, role, {
      excludeExtraneousValues: true,
    });
  }

  async updateRole(roleId: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRoleById(roleId);
    if (!role) {
      throw new NotFoundException();
    }
    const roleUpdate: Partial<RoleEntity> = {
      ...role,
      ...updateRoleDto,
    };

    return await this.roleRepository.save(roleUpdate);
  }

  async deleteRole(roleId: string) {
    const role = await this.getRoleById(roleId);
    if (!role) {
      throw new NotFoundException();
    }

    await this.roleRepository.remove(role);
  }

  async getRoleByIds(roleIds: string[]) {
    const roles = await this.roleRepository.find({
      where: { id: In(roleIds) },
    });
    return roles;
  }
}
