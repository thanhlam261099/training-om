import { Expose } from 'class-transformer';
import { RoleEntity } from 'src/domain/entities';

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
  roles: RoleEntity[];
}

export class GetUserDetailDto {
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
  roles: RoleEntity[];
}
