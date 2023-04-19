import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(helmet());

  // Configuracion de Swagger para Nest
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentacion API Products Microservice')
    .setDescription('The Products API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Products')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  //Configurar los cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Config validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT);

  console.log(`Run in port: ${process.env.PORT}`);
}
bootstrap();
