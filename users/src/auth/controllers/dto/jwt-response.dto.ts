import { IsString } from 'class-validator';

export class JwtResponseDto {
  @IsString()
  jwt: string;
}
