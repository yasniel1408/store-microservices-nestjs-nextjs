import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(12)
  password: string;
}
