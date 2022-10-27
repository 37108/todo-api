import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
  UseFilters,
  UseGuards,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { QueryFailedError } from 'typeorm';
import { v4 } from 'uuid';
import { GetMeta } from '../auth/auth.decorator';

import { DefaultErrorResponse } from '../errors/error.decorator';
import { CreateTaskDto, UpdateTaskDto } from './interfaces/tasks.dto';
import { Task } from './interfaces/tasks.entity';
import { TaskResponse } from './interfaces/tasks.interface';
import { QueryFailedExceptionFilter } from './tasks.filter';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@ApiBearerAuth()
@DefaultErrorResponse()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  private async validateOwnership(taskId: string, username: string) {
    try {
      const task = await this.tasksService.find(taskId);
      if (!task) {
        throw new NotFoundException('this task does not found');
      }
      if (task.createdBy !== username) {
        throw new NotFoundException('this task does not found');
      }
      return;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Get()
  @ApiOkResponse({
    type: [TaskResponse],
  })
  async findByUser(@GetMeta() meta): Promise<Task[]> {
    try {
      return this.tasksService.findByUser(meta.username);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'empty response',
  })
  @UseFilters(new QueryFailedExceptionFilter())
  async create(@Body() body: CreateTaskDto, @GetMeta() meta) {
    await this.tasksService.create({
      ...body,
      id: v4(),
      createdBy: meta.username,
      description: body.description ?? '',
      status: body.status ?? 'yet',
      deadline: body.deadline ?? null,
      completedAt: null,
      workingHours: 0,
    });
    return;
  }

  @Get(':id')
  @ApiOkResponse({
    type: TaskResponse,
  })
  async find(@Param('id') id: string, @GetMeta() meta): Promise<TaskResponse> {
    try {
      const res = await this.tasksService.find(id);
      if (!res || res.createdBy !== meta.username) {
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
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'empty response',
  })
  @UseFilters(new QueryFailedExceptionFilter())
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @GetMeta() meta,
  ) {
    if (id !== body.id) {
      throw new BadRequestException();
    }
    await this.validateOwnership(id, meta.username);

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
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'empty response',
  })
  async delete(@Param('id') id: string, @GetMeta() meta) {
    await this.validateOwnership(id, meta.username);
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
