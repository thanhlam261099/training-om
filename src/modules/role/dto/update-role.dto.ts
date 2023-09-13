import { Expose } from 'class-transformer';
import { PermissionEntity } from 'src/domain/entities';

export class UpdateRoleDto {
  id: string;
  @Expose()
  roleName: string;

  description: string;

  permissions: PermissionEntity[];
}
