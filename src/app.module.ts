import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './database/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig)],
})
export class AppModule {}
