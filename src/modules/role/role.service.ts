import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly permissionService: PermissionsService,
  ) {}

  // async createRole(createRole: CreateRoleDto) {
  //   const { permissionIds } = createRole;
  //   let roleToCreate = { ...createRole };
  //   if (permissionIds || permissionIds?.length > 0) {
  //     const permission = await this.permissionService.getPermissionsByIds(
  //       permissionIds,
  //     );
  //     createRole = {
  //       ...roleToCreate,
  //     };
  //   }

  //   await this.roleRepository.save(createRole);
  // }
}
