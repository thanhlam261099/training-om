import { Expose } from 'class-transformer';

export class GetPermissionDetailDto {
  @Expose()
  id: string;

  @Expose()
  permissionName: string;

  @Expose()
  description: string;
}

export class GetAllPermissionDto {
  @Expose()
  id: string;
  @Expose()
  // data: GetPermissionDetailDto[];
  permissionName: string;
  @Expose()
  description: string;
}
