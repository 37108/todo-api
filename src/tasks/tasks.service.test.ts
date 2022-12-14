import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './interfaces/tasks.entity';
import { TasksService } from './tasks.service';

function generateTask(): Task {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.paragraph(),
    description: faker.lorem.paragraphs(),
    status: faker.helpers.arrayElement(['yet', 'in_progress', 'done']),
    deadline: faker.date.past(),
    workingHours: faker.datatype.number(),
    completedAt: faker.datatype.datetime(),
    createdBy: faker.name.fullName(),
  };
}

describe('Tasks Service', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should create a task', async () => {
    const task = generateTask();
    const request = {
      id: task.id,
      title: task.title,
      description: task.description,
      createdBy: task.createdBy,
    };
    jest.spyOn(repository, 'save').mockImplementation(async () => undefined);
    expect(await service.create(request)).toBe(undefined);
  });

  it('should update the task', async () => {
    const task = generateTask();
    const request = {
      id: task.id,
      title: task.title,
      description: task.description,
    };
    jest.spyOn(repository, 'update').mockImplementation(async () => undefined);
    expect(await service.update(request)).toBe(undefined);
  });

  it('should delete the task', async () => {
    const task = generateTask();
    const request = task.id;
    jest.spyOn(repository, 'delete').mockImplementation(async () => undefined);
    expect(await service.delete(request)).toBe(undefined);
  });

  it('should return all tasks', async () => {
    const result = [generateTask(), generateTask()];

    jest.spyOn(repository, 'find').mockImplementation(async () => result);
    expect(await service.findAll()).toBe(result);
  });

  it('should return the task', async () => {
    const result = generateTask();
    jest.spyOn(repository, 'findOneBy').mockImplementation(async () => result);
    expect(await service.find(result.id)).toBe(result);
  });

  it('should return the tasks filtered by status', async () => {
    const result = [generateTask(), generateTask()];
    jest.spyOn(repository, 'findBy').mockImplementation(async () => result);
    expect(await service.findByStatus('in_progress')).toBe(result);
  });
});
