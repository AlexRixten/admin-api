import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { EUserErrors } from '../../common/enums/errors.enum';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(EUserErrors.UserExist);
    return this.userService.createUser(dto);
  }
  async login(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(EUserErrors.UserNotFound);

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(EUserErrors.WrongData);

    const userData = {
      name: existUser.first_name,
      email: existUser.email,
    };

    const token = await this.tokenService.generateJwtToken(userData);
    const user = await this.userService.publicUser(dto.email);
    return { ...user, token };
  }
}
