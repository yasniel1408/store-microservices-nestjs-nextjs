import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '@app/users/usecases/users.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUsersDto } from './dto/response-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { EventPattern } from '@nestjs/microservices';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse()
  async create(
    @Body() createProductDto: CreateUserDto,
  ): Promise<ResponseUsersDto> {
    return this.usersService.create(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ isArray: true, type: Promise<ResponseUsersDto[]> })
  findAll(): Promise<ResponseUsersDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<ResponseUsersDto> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<ResponseUsersDto> {
    return this.usersService.update(+id, updateUsersDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string): Promise<ResponseUsersDto> {
    return this.usersService.remove(+id);
  }

  // Ejemplo de como recibir un evento
  @EventPattern('ProductCreated')
  productCreatedByEvent(data) {
    console.log(data);
  }
}
