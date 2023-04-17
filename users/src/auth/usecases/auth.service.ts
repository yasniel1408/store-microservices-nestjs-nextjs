import { UsersService } from '@app/users/usecases/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from '@app/auth/controllers/dto/login-auth.dto';
import { RegisterAuthDto } from '@app/auth/controllers/dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtResponseDto } from '@app/auth/controllers/dto/jwt-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<JwtResponseDto> {
    const user = await this.usersService.findByEmail(loginAuthDto.email);
    if (!user) {
      new HttpException('USER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }
    const isCheckedPassword = await compare(
      loginAuthDto.password,
      user.password,
    );

    if (!isCheckedPassword) {
      new HttpException('PASSWORD_NOT_MATCH', HttpStatus.FORBIDDEN);
    }

    const jwt = this.jwtService.sign({ user });

    return {
      jwt,
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;

    const plainToHash = await hash(password, 10);

    registerAuthDto = { ...registerAuthDto, password: plainToHash };

    return this.usersService.create(registerAuthDto);
  }
}
