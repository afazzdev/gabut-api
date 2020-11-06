import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Entity('invoices')
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'invoice_id' })
  invoiceId: string;

  /**
   * Relations
   */
  @ManyToOne(() => User, (user) => user.invoices, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: User;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable({
    name: 'invoice_products',
    joinColumn: { name: 'invoice_id', referencedColumnName: 'invoiceId' },
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
