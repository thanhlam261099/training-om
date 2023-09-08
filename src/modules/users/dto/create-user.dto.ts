import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateRoleDto } from 'src/modules/role/dto/create-role.dto';
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

  @IsNotEmpty()
  roles: CreateRoleDto[];
}

export class CreateUserResDto {
  @Expose()
  id: string;
}
