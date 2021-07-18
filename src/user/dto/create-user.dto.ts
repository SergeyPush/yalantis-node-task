import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  secondName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
