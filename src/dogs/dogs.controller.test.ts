import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dog } from './dogs.entity';

describe('Dogs Controller', () => {
  let dogsController: DogsController;
  let dogsService: DogsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [
        DogsService,
        {
          provide: getRepositoryToken(Dog),
          useClass: Repository,
        },
      ],
    }).compile();

    dogsController = module.get<DogsController>(DogsController);
    dogsService = module.get<DogsService>(DogsService);
  });

  it('should return an array of dogs', async () => {
    const result: Dog[] = [
      {
        id: 1,
        name: 'john',
        age: 24,
        breed: 'johnny',
      },
    ];
    jest.spyOn(dogsService, 'findAll').mockImplementation(async () => result);

    expect(await dogsController.findAll()).toBe(result);
  });

  it('should return an empty response', async () => {
    const request = {
      id: 1,
      name: 'john',
      age: 24,
      breed: 'johnny',
    };

    jest.spyOn(dogsService, 'create').mockImplementation(async () => undefined);
    expect(await dogsController.create(request)).toBe(undefined);
  });
});
