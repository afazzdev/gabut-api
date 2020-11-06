import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  SignUpCredentialsDTO,
  SignInCredentialsDTO,
} from './dto/auth-credentials.dto';
import { ISignInResponse, ISignUpResponse } from './dto/auth-responses.dto';
import { Status } from 'src/utils/responseJson';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { GetUser } from './get-user.decorator';
import { User } from 'src/user/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) signUpCredentialsDTO: SignUpCredentialsDTO,
  ): Promise<ISignUpResponse> {
    const data = await this.authService.signUp(signUpCredentialsDTO);

    return {
      status: Status.success,
      message: 'Akun berhasil dibuat!',
      data,
    };
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(
    @Body(ValidationPipe) signInCredentialsDTO: SignInCredentialsDTO,
  ): Promise<ISignInResponse> {
    const data = await this.authService.signIn(signInCredentialsDTO);

    return {
      status: Status.success,
      message: 'Login berhasil!',
      data,
    };
  }

  @UseGuards(AuthGuard())
  @Patch('change-password')
  async changePassword(
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDTO,
    @GetUser() user: User,
  ) {
    const { token } = await this.authService.changePassword(
      user,
      changePasswordDto,
    );

    return {
      status: Status.success,
      message: 'Password berhasil di ganti!',
      token,
    };
  }
}
