import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './interfaces/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  async create(task: Task) {
    await this.repository.save(task);
  }
  async update(task: Omit<Task, 'createdBy'>) {
    this.repository.update({ id: task.id }, task);
  }
  async delete(id: string) {
    this.repository.delete({ id });
  }

  async find(id: string): Promise<Task | null> {
    return this.repository.findOneBy({ id });
  }
  async findByUser(username: string): Promise<Task[] | null> {
    return this.repository.findBy({ createdBy: username });
  }

  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }
  async findByStatus(status: 'yet' | 'in_progress' | 'done'): Promise<Task[]> {
    return this.repository.findBy({ status });
  }
}
