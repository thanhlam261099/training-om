import { IsNotEmpty } from 'class-validator';

export class UpdatePermissionDto {
  @IsNotEmpty()
  permissionName: string;

  @IsNotEmpty()
  description: string;
}
