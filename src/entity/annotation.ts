import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post';
import { Book } from './book';

@Entity()
export class Annotation extends Post {
  @ManyToOne(type => Book, book => book.annotations)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  book_id: string;

  // 在书中的位置
  @Column()
  position: string = '';

  @Column()
  content: string;

  @Column()
  comment: string;
}
