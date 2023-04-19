import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header['Authorization'];
    console.log(token);
    const user = this.jwtService.decode(token);
    console.log(user);
    req['currentUser'] = user;
    next();
  }
}
