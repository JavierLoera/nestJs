import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':email')
  GetUserByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
  @Post('adduser')
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

}
