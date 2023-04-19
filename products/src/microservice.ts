import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://rorhsacz:riM7HCSK2vdvcINZ0b74zwy15dvCxcKH@jaragua.lmq.cloudamqp.com/rorhsacz',
        ],
        queue: 'products_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  // Config validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();

  console.log(`Microservices RUNINNG`);
}
bootstrap();
