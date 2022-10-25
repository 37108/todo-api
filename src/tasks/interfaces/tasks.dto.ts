import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsUUID, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    required: true,
    example: '犬のお散歩',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: false,
    example: '犬を外に連れ出す',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
    enum: ['yet', 'in_progress', 'done'],
    example: 'yet',
  })
  @IsOptional()
  @IsEnum(['yet', 'in_progress', 'done'])
  status?: 'yet' | 'in_progress' | 'done';

  @ApiProperty({
    required: false,
    example: '2011-10-05T14:48:00.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deadline?: Date;
}

export class UpdateTaskDto extends CreateTaskDto {
  @ApiProperty({
    required: true,
    example: 'c7eef771-c9c9-47f4-92ef-623e9351810c',
  })
  @IsUUID()
  id: string;
}
