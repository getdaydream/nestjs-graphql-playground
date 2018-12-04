import { Request } from 'express';
import { User } from 'src/user/user.entity';

declare module 'express' {
  interface Request {
    // 通过 jwt 认证后添加  user 信息到 request 上
    user: User;
  }
}