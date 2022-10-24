import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
  UseFilters,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { v4 } from 'uuid';
import { Task } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';
import { QueryFailedExceptionFilter } from './tasks.filter';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Request() req): Promise<Task[]> {
    console.log(req.user);
    try {
      return this.tasksService.findAll();
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Post()
  @UseFilters(new QueryFailedExceptionFilter())
  async create(@Body() body: CreateTaskDto) {
    await this.tasksService.create({
      ...body,
      id: v4(),
      description: body.description ?? '',
      status: body.status ?? 'yet',
      deadline: body.deadline ?? null,
      completedAt: null,
      workingHours: 0,
    });
    return;
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Task> {
    try {
      const res = await this.tasksService.find(id);
      if (!res) {
        throw new NotFoundException('this task does not found');
      }
      return res;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    if (id !== body.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    try {
      await this.tasksService.update({
        ...body,
        description: body.description ?? '',
        status: body.status ?? 'yet',
        deadline: body.deadline ?? null,
        completedAt: null,
        workingHours: 0,
      });
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else if (err instanceof QueryFailedError) {
        throw new InternalServerErrorException('query failed');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      this.tasksService.delete(id);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException();
      }
    }
    return;
  }
}
