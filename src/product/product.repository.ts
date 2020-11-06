import { EntityRepository, Repository } from 'typeorm';
/**
 * Entities
 */
import { Product } from './product.entity';

/**
 * DTO
 */
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
