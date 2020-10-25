import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { fullName, email, password } = authCredentialsDTO;

    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = await this.hashPassword(password);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<User['id']> {
    const { email, password } = authCredentialsDTO;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.id;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
