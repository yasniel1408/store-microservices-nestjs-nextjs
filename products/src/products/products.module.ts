import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import {
  ExtractUserMiddleware,
  JwtAuthGuard,
  JwtStrategy,
} from '@store-microservice-nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProductsService } from './usecases/products.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://rorhsacz:riM7HCSK2vdvcINZ0b74zwy15dvCxcKH@jaragua.lmq.cloudamqp.com/rorhsacz',
          ],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TIME_EXPIRATION_JWT },
    }),
  ],
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
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExtractUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
