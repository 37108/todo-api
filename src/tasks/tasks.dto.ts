import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['yet', 'in_progress', 'done'])
  status?: 'yet' | 'in_progress' | 'done';

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deadline?: Date;
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsUUID()
  id: string;
}
