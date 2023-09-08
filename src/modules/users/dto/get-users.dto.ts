import { IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { GetAllRoleDto } from 'src/modules/role/dto/get-role.dto';

export class GetAllUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  isPending: boolean;

  @Expose()
  isDisable: boolean;

  @Expose()
  roles: GetAllRoleDto[];
}

export class GetUserDetailDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;
}
