import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(1, 20, {
    message: 'username must be between 1 and 20 characters long',
  })
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  password: string;

  @IsOptional()
  isAdmin: boolean;
}
