import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'path/to/database/file.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'admin',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      // autoLoadEntities: true, // Esto solo es para desarrollo ya que va a estar eliminando y creando la base de datos
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
