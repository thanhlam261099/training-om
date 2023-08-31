import { Expose } from 'class-transformer';

export class GetAllDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  // @Expose()
  // roles: GetRoleDto[]
}
