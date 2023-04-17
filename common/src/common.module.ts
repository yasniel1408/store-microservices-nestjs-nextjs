import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/guards/jwt-auth.guard';
import { JwtStrategy } from './jwt/strategies/jwt.strategy';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy, LoggerMiddleware],
  exports: [JwtAuthGuard, JwtStrategy, LoggerMiddleware],
})
export class CommonModule {}
