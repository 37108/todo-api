import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
import { faker } from '@faker-js/faker';
import { TasksController } from './tasks.controller';

function generateTask(): Task {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.paragraph(),
    description: faker.lorem.paragraphs(),
    status: faker.helpers.arrayElement(['yet', 'in_progress', 'done']),
    deadline: faker.date.past(),
    workingHours: faker.datatype.number(),
    completedAt: faker.datatype.datetime(),
  };
}

describe('Dogs Controller', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it.todo('should return an array of tasks');
  it.todo('should create a task');
  it.todo('should return the task');
  it.todo('should update the task');
  it.todo('should delete the task');
});
