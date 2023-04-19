import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Req,
} from '@nestjs/common';
import { ProductsService } from '@app/products/usecases/products.service';
import { CreateProductDto } from '@app/products/controllers/dto/create-product.dto';
import { UpdateProductDto } from '@app/products/controllers/dto/update-product.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseProductDto } from './dto/response-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { IsPublicRoute } from '@store-microservice-nestjs/common';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('PRODUCTS_SERVICE')
    private readonly clientMicroService: ClientProxy,
  ) {}

  // Ejemplo enviando un evento
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse()
  @ApiOkResponse()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
  ): Promise<ResponseProductDto> {
    const product = this.productsService.create(createProductDto);
    this.clientMicroService.emit<ResponseProductDto[]>('ProductCreated', {
      product,
      user: req['currentUser'],
    });
    return product;
  }

  @IsPublicRoute()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ isArray: true, type: Promise<ResponseProductDto[]> })
  async findAll(): Promise<ResponseProductDto[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  findOne(@Param('id') id: string): Promise<ResponseProductDto> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ResponseProductDto> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  remove(@Param('id') id: string): Promise<ResponseProductDto> {
    return this.productsService.remove(+id);
  }
}
