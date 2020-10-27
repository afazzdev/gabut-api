import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AuthRepository } from './auth.repository';

import { JwtPayload } from './jwt-payload';
import {
  SignUpCredentialsDTO,
  SignInCredentialsDTO,
} from './dto/auth-credentials.dto';
import {
  ISignInResponseData,
  ISignUpResponseData,
} from './dto/auth-responses.dto';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDTO: SignUpCredentialsDTO,
  ): Promise<ISignUpResponseData> {
    const newUser = await this.authRepository.signUp(authCredentialsDTO);

    const token = this.signToken({ id: newUser.id });

    return {
      token,
      user: newUser,
    };
  }

  async signIn(
    signInCredentialsDTO: SignInCredentialsDTO,
  ): Promise<ISignInResponseData> {
    const user = await this.authRepository.validateUserPassword(
      signInCredentialsDTO,
    );

    if (!user?.id) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken({ id: user.id });

    // this.logger.debug(`Generate JWT token with token ${JSON.stringify(token)}`);

    return { token, user };
  }

  private signToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
