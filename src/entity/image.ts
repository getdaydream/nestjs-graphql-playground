import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './tag';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  description: string = '';

  @Column()
  url: string;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
