import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async find(username: string): Promise<User> {
    return await this.repository.findOneBy({ username });
  }
  async create(user: User) {
    await this.repository.save(user);
    return;
  }
}
