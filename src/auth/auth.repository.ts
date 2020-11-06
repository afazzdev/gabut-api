import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';
import {
  SignUpCredentialsDTO,
  SignInCredentialsDTO,
} from './dto/auth-credentials.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(signUpCredentialsDTO: SignUpCredentialsDTO): Promise<User> {
    const { fullName, email, password } = signUpCredentialsDTO;

    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = await this.hashPassword(password);

    try {
      await user.save();

      // Delete unnecessary data for client
      delete user.password;
      delete user.resetPasswordToken;
      delete user.resetPasswordExpired;

      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email sudah terdaftar!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    signInCredentialsDTO: SignInCredentialsDTO,
  ): Promise<User> {
    const { email, password } = signInCredentialsDTO;
    const user = await this.findOne({
      select: [
        'userId',
        'email',
        'password',
        'fullName',
        'role',
        'address',
        'createdAt',
        'updatedAt',
      ],
      where: { email },
    });

    if (user && (await user.validatePassword(password))) {
      // Delete password from response
      delete user.password;
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
