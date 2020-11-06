import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Status } from 'src/utils/responseJson';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts();

    return {
      status: Status.success,
      message: 'Data produk berhasil diambil!',
      data: products,
    };
  }

  @UseGuards(AuthGuard())
  @Post()
  async createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @GetUser() seller: User,
  ) {
    const product = this.productService.createProduct(createProductDto, seller);

    return {
      status: Status.success,
      message: 'Produk berhasil dibuat!',
      data: product,
    };
  }
}
