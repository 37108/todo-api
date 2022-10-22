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
} from '@nestjs/common';
import { Task } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';
import { v4 } from 'uuid';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }
  @Post()
  async create(@Body() body: CreateTaskDto) {
    this.tasksService.create({
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
    return this.tasksService.find(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    if (id !== body.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    this.tasksService.update({
      ...body,
      description: body.description ?? '',
      status: body.status ?? 'yet',
      deadline: body.deadline ?? null,
      completedAt: null,
      workingHours: 0,
    });
    return;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.tasksService.delete(id);
    return;
  }
}
