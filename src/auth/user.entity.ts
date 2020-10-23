import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  // Unique,
  // OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  admin = 'admin',
  user = 'user',
}

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'full_name',
    type: 'varchar',
  })
  fullName: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'reset_password',
    nullable: true,
  })
  resetPassword: string;

  @Column({
    name: 'reset_password_expired',
    type: 'timestamp with time zone',
    nullable: true,
  })
  resetPasswordExpired: Date;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  // @OneToMany(
  //   type => Task,
  //   tasks => tasks.user,
  //   { eager: true },
  // )
  // tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const result = await bcrypt.compare(password, this.password);
    return result;
  }
}
