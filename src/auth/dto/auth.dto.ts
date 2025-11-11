import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO cho /auth/register
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password greater than 6 characters' })
  password: string;
}

// DTO cho /auth/login
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

// DTO cho /auth/login
export class ValidateTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
