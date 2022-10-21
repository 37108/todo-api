import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './dogs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
  ) {}

  create(dog: Dog) {
    this.dogsRepository.save(dog);
  }
  findAll(): Promise<Dog[]> {
    return this.dogsRepository.find();
  }
}
