import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  image: string;

  @Column({ default: 0 })
  likes: number;
}
