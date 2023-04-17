import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@app/products/controllers/dto/create-product.dto';
import { UpdateProductDto } from '@app/products/controllers/dto/update-product.dto';
import { ProductEntity } from '@app/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save(createProductDto);
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto): any {
    return this.productRepository.update({ id }, updateProductDto);
  }

  async remove(id: number): Promise<ProductEntity> {
    const currentProduct = await this.findOne(id);
    return this.productRepository.remove(currentProduct);
  }
}
