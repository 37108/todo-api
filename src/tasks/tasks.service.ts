import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  async create(task: Task) {
    await this.repository.save(task);
  }
  async update(task: Task) {
    this.repository.update({ id: task.id }, task);
  }
  async delete(id: string) {
    this.repository.softDelete({ id });
  }

  async find(id: string): Promise<Task | null> {
    return this.repository.findOneBy({ id });
  }
  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }
  async findByStatus(status: string): Promise<Task[]> {
    return this.repository.findBy({ status });
  }
}
