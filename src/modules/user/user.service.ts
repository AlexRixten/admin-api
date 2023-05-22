import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { EUserErrors } from '../../enums/errors.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}
  async getUsers() {
    return this.userRepository.findAll();
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(EUserErrors.UserExist);

    const passwordHash = await this.hashPassword(dto.password);
    const newUser = { ...dto, password: passwordHash };
    await this.userRepository.create(newUser);
    return dto;
  }
}
