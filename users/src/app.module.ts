import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TIME_EXPIRATION_JWT },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
