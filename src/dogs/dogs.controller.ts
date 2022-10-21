import { Controller, Get, Post, Body } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { Dog } from './dogs.entity';
import { DogDto } from './dogs.dto';

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
