import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/product/product.entity';
import { Cart } from './cart.entity';

@Entity('cart_products')
export class CartProducts extends BaseEntity {
  @Column({
    name: 'qty',
    default: 1,
  })
  qty: number;

  /**
   * Relations
   */
  @ManyToOne(() => Cart, {
    nullable: false,
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'cartId' })
  cartId: Cart;

  @ManyToOne(() => Product, {
    nullable: false,
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'productId' })
  productId: Product;

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
