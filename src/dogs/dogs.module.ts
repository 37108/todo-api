import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DogsController } from './dogs.controller';
import { Dog } from './dogs.entity';
import { DogsService } from './dogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
