import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  SignUpCredentialsDTO,
  SignInCredentialsDTO,
} from './dto/auth-credentials.dto';
import { ISignInResponse, ISignUpResponse } from './dto/auth-responses.dto';
import { Status } from 'src/utils/responseJson';

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
}
