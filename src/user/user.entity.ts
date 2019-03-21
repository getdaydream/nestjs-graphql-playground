import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { createHmac } from 'crypto';

class PasswordTransformer implements ValueTransformer {
  to(value: string) {
    return createHmac('sha256', value).digest('hex');
  }
  from(value: string) {
    return value;
  }
}

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  nickname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({
    length: 255,
    select: false,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @CreateDateColumn()
  creat_at: Date;
}
