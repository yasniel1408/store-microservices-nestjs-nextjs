import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@app/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@app/users/controllers/dto/create-user.dto';
import { UpdateUsersDto } from '@app/users/controllers/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  create(createProductDto: CreateUserDto): Promise<UsersEntity> {
    return this.usersRepository.save(createProductDto);
  }

  findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateUsersDto): any {
    return this.usersRepository.update({ id }, updateProductDto);
  }

  async remove(id: number): Promise<UsersEntity> {
    const currentProduct = await this.findOne(id);
    return this.usersRepository.remove(currentProduct);
  }

  async findByEmail(email: string): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOneBy({ email });
  }
}
