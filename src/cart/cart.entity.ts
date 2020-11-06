import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

@Entity('cart')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'cart_id' })
  cartId: string;

  /**
   * Relations
   */
  @ManyToMany(() => Product, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'cart_products',
    joinColumn: {
      name: 'cart_id',
      referencedColumnName: 'cartId',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'productId',
    },
  })
  products: Product[];

  /**
   * Defaults
   */
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
