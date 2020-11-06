import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getProducts() {
    const product = await this.productRepository.find();

    return product;
  }

  async createProduct(createProductDto: CreateProductDto, seller: User) {
    const Product = await this.productRepository
      .create({
        ...createProductDto,
        seller,
      })
      .save();

    return Product;
  }
}
