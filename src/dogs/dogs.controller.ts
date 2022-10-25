import { Controller, Get, Post, Body } from '@nestjs/common';

import { DogDto } from './dogs.dto';
import { Dog } from './dogs.entity';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Post()
  async create(@Body() body: DogDto) {
    this.dogsService.create(body);
    return;
  }
  @Get()
  async findAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }
}
