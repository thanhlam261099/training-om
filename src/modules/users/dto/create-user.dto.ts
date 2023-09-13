import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleEntity } from 'src/domain/entities';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20, {
    message: 'username must be between 1 and 20 characters long',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @IsOptional()
  // password: string;

  @IsOptional()
  roles: RoleEntity[];
}

export class CreateUserResDto {
  @Expose()
  id: string;
}
