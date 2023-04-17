import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from '@app/auth/usecases/auth.service';
import { IsPublicRoute } from '@store-microservice-nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtResponseDto } from './dto/jwt-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublicRoute()
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto): Promise<JwtResponseDto> {
    return this.authService.login(loginAuthDto);
  }

  @IsPublicRoute()
  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto): Promise<RegisterAuthDto> {
    return this.authService.register(registerAuthDto);
  }
}
