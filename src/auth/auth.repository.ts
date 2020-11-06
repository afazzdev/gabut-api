import { EntityRepository, getManager, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Entities
 */
import { User } from '../user/user.entity';
import { Cart } from '../cart/cart.entity';

/**
 * DTO
 */
import {
  SignUpCredentialsDTO,
  SignInCredentialsDTO,
} from './dto/auth-credentials.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(signUpCredentialsDTO: SignUpCredentialsDTO): Promise<User> {
    const { fullName, email, password } = signUpCredentialsDTO;

    const cart = new Cart();

    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = await this.hashPassword(password);
    user.cart = cart;

    try {
      await getManager().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(cart);
        await transactionalEntityManager.save(user);
      });

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
        'changedPasswordAt',
      ],
      where: { email },
      relations: ['cart'],
    });

    if (user && (await user.validatePassword(password))) {
      // Delete password from response
      delete user.password;
      return user;
    } else {
      return null;
    }
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDTO) {
    const { current_password, new_password } = changePasswordDto;
    const user = await this.findOneOrFail(id, {
      select: [
        'userId',
        'email',
        'password',
        'fullName',
        'role',
        'address',
        'createdAt',
        'updatedAt',
        'changedPasswordAt',
      ],
    });

    if (user && (await user.validatePassword(current_password))) {
      user.changedPasswordAt = new Date();
      user.password = await this.hashPassword(new_password);
      await user.save();
      return;
    } else {
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
