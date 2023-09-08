import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionsDto {
  @IsNotEmpty()
  permissionName: string;

  @IsNotEmpty()
  description: string;
}

export class CreatePermissionResDto {
  @Expose()
  id: string;
}
