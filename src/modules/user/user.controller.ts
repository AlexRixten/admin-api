import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EPrefixes } from '../../common/enums/prefixes.enum';
import { CreateUserDTO, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller(EPrefixes.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiTags('USERS')
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @ApiTags('USERS')
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.userService.updateUser(userId, updateDto);
  }

  @ApiTags('USERS')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<boolean> {
    return this.userService.deleteUser(userId);
  }
}
