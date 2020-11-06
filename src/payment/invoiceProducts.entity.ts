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
import { Invoice } from './invoice.entity';

@Entity('invoice_products')
export class InvoiceProducts extends BaseEntity {
  @Column({
    name: 'qty',
    default: 0,
  })
  qty: number;

  /**
   * Relations
   */
  @ManyToOne(() => Invoice, {
    nullable: false,
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'invoiceId' })
  invoiceId: Invoice;

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
