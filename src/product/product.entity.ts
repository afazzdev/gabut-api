import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Unique('unique_product_per_seller', ['seller', 'name'])
@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  productId: string;

  @Column()
  name: string;

  @Column({
    type: 'money',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  discount: number;

  @Column({
    name: 'qty',
    default: 0,
  })
  qty: number;

  /**
   * Relations
   */
  @ManyToOne(() => User, (user) => user.products, { nullable: false })
  @JoinColumn({ name: 'seller_id', referencedColumnName: 'userId' })
  seller: User;

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
