import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getUser(id: string): Promise<User | null> {
    console.log('hiiiiiiiiiiiiii', id);
    const user = await this.userRepo.findOne({ where: { id: +id } });
    return user; // could be null!
  }
}
