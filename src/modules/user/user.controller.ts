import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { EPrefixes } from '../../enums/prefixes.enum';

@Controller(EPrefixes.User)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
