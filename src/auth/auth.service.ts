import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import {
  SignUpCredentialsDTO,
  SignInCredentialsDTO,
} from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload';
import { ISignInResponseData } from './dto/signinResponse.dto';
import { ISignUpResponseData } from './dto/signupResponse.dto';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDTO: SignUpCredentialsDTO,
  ): Promise<ISignUpResponseData> {
    const newUser = await this.userRepository.signUp(authCredentialsDTO);

    const token = this.signToken({ id: newUser.id });

    return {
      token,
      user: newUser,
    };
  }

  async signIn(
    signInCredentialsDTO: SignInCredentialsDTO,
  ): Promise<ISignInResponseData> {
    const user = await this.userRepository.validateUserPassword(
      signInCredentialsDTO,
    );

    if (!user?.id) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken({ id: user.id });

    this.logger.debug(`Generate JWT token with token ${JSON.stringify(token)}`);

    return { token, user };
  }

  private signToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
