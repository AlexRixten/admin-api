import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDto } from './dto';

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
    const passwordHash = await this.hashPassword(dto.password);
    const newUser = { ...dto, password: passwordHash };
    await this.userRepository.create(newUser);
    return dto;
  }

  async publicUser(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(dto, { where: { id } });
    return dto;
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.userRepository.destroy({ where: { id } });
    return true;
  }
}
