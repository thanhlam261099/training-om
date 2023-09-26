import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Expose()
  @Length(1, 20, {
    message: 'username must be between 1 and 20 characters long',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
