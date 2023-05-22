import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  patronymic: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}