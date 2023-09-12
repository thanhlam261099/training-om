import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PermissionEntity } from 'src/domain/entities';

export class CreateRoleDto {
  @IsNotEmpty()
  roleName: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  permissions: PermissionEntity[];
}
