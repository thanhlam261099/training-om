import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class GetAllPermissionDto {
  @IsNotEmpty()
  @Expose()
  permissionName: string;

  @IsNotEmpty()
  @Expose()
  description: string;
}
