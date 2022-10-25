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
  Request,
  UseGuards,
  Req,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { v4 } from 'uuid';
import { Task } from './interfaces/tasks.entity';
import { CreateTaskDto, UpdateTaskDto } from './interfaces/tasks.dto';
import { TasksService } from './tasks.service';
import { QueryFailedExceptionFilter } from './tasks.filter';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { DefaultErrorResponse } from '../libs/error.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { TaskResponse } from './interfaces/tasks.interface';

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
  async findByUser(
    @Request() req: { user: { username: string } },
  ): Promise<Task[]> {
    try {
      return this.tasksService.findByUser(req.user.username);
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
  async create(
    @Body() body: CreateTaskDto,
    @Req() req: { user: { username: string } },
  ) {
    await this.tasksService.create({
      ...body,
      id: v4(),
      createdBy: req.user.username,
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
  async find(
    @Param('id') id: string,
    @Req() req: { user: { username: string } },
  ): Promise<TaskResponse> {
    try {
      const res = await this.tasksService.find(id);
      if (!res || res.createdBy !== req.user.username) {
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
    @Req() req: { user: { username: string } },
  ) {
    if (id !== body.id) {
      throw new BadRequestException();
    }
    await this.validateOwnership(id, req.user.username);

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
  async delete(
    @Param('id') id: string,
    @Req() req: { user: { username: string } },
  ) {
    await this.validateOwnership(id, req.user.username);
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
