import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeORMConfig from '../typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, UserModule, ProductModule, CartModule, PaymentModule, WishlistModule],
})
export class AppModule {}
