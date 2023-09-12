import { IsEmail, IsOptional } from 'class-validator';
import { RoleEntity } from 'src/domain/entities';

export class UpdateUserDto {
  id: string;
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  roles: RoleEntity[];
}
