import { Controller, Get } from '@nestjs/common';
@Controller('/')
export class MyController {
  @Get()
  hola() {
    return 'Hola mundo';
  }
}
