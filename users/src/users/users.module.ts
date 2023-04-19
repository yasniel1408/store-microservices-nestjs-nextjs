import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './usecases/users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ExtractUserMiddleware,
  LoggerMiddleware,
} from '@store-microservice-nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
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
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, ExtractUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
