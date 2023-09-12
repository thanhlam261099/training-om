import { Expose } from 'class-transformer';

export class UpdateRoleDto {
  id: string;
  @Expose()
  roleName: string;

  @Expose()
  description: string;
}
