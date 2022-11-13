import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

import { AuthService } from '../../middleware/guard/auth.guard';
import { UserFormDTO } from './dto/userDTO.dto';
import { LoginDTO } from './dto/userLogin.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthService)
  @Get(':id')
  getProfile(@Param('id') id: ParseUUIDPipe) {
    return this.userService.findOne(id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const users = await this.userService.findAll({ ...req.query });
    return {
      data: users[0],
      pagination: {
        count: users[1],
        curr_page: +req.query.offset,
        next_page: +req.query.offset + 1,
      },
    };
  }

  @Post('/register')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  register(@Body() user: UserFormDTO) {
    return this.userService.create(user);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginForm: LoginDTO) {
    return this.userService.login(loginForm);
  }

  updated() {
    throw new Error('Method not implemented.');
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleted(id);
  }
}
