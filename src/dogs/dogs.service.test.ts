import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DogsService } from './dogs.service';
import { Dog } from './dogs.entity';

describe('Dogs Service', () => {
  let dogsService: DogsService;
  let dogsRepository: Repository<Dog>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [],
      providers: [
        DogsService,
        {
          provide: getRepositoryToken(Dog),
          useClass: Repository,
        },
      ],
    }).compile();

    dogsService = module.get<DogsService>(DogsService);
    dogsRepository = module.get<Repository<Dog>>(getRepositoryToken(Dog));
  });

  it('should return all of dogs', async () => {
    const result: Dog[] = [
      {
        id: 1,
        name: 'john',
        age: 24,
        breed: 'johnny',
      },
    ];
    jest.spyOn(dogsRepository, 'find').mockImplementation(async () => result);

    expect(await dogsService.findAll()).toBe(result);
  });

  it('should return undefined', async () => {
    const request = {
      id: 1,
      name: 'john',
      age: 24,
      breed: 'johnny',
    };

    jest.spyOn(dogsRepository, 'save').mockImplementation(async () => request);

    expect(await dogsService.create(request)).toBe(undefined);
  });
});
