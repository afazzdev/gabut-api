import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  @UseGuards(AuthGuard())
  @Get('/')
  async getUsers() {
    return 'success';
  }

  @Get('/test')
  async test() {
    return 'tested';
  }
}
