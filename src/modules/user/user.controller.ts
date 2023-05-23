import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { EPrefixes } from '../../common/enums/prefixes.enum';
import { CreateUserDTO } from './dto';

@Controller(EPrefixes.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  async createUsers(@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }
}
