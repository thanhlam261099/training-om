import { IsNotEmpty } from 'class-validator';

export class CreatePermissionsDto {
  @IsNotEmpty()
  permissionName: string;

  @IsNotEmpty()
  description: string;
}
