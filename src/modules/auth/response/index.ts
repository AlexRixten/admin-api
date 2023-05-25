import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UserResponse {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  patronymic: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  @IsString()
  token: string;
}
