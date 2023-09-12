import { Expose } from 'class-transformer';
import { PermissionEntity } from 'src/domain/entities';
export class GetRoleDto {
  @Expose()
  id: string;

  @Expose()
  roleName: string;

  @Expose()
  description: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  permissions: PermissionEntity[];
}
