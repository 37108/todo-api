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

  create(task: Task) {
    this.repository.save(task);
  }
  update(task: Task) {
    this.repository.update({ id: task.id }, task);
  }
  delete(id: string) {
    this.repository.softDelete({ id });
  }

  find(id: string): Promise<Task> {
    return this.repository.findOneBy({ id });
  }
  findAll(): Promise<Task[]> {
    return this.repository.find();
  }
  findByStatus(status: string): Promise<Task[]> {
    return this.repository.findBy({ status });
  }
}
