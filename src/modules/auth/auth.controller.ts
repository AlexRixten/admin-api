import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EPrefixes } from '../../common/enums/prefixes.enum';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';

@Controller(EPrefixes.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  sighUp(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.signUp(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<UserLoginDTO> {
    return this.authService.login(dto);
  }
}
