import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const id = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!id) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(
      `Generate JWT token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }
}
