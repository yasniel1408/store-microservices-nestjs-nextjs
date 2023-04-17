import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard, JwtStrategy } from '@store-microservice-nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProductsService } from './usecases/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  // providers: [ProductsService],
  providers: [
    ProductsService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ProductsModule {}
