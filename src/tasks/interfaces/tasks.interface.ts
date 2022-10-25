import { ApiProperty } from '@nestjs/swagger';

export class TaskResponse {
  @ApiProperty({
    example: 'c7eef771-c9c9-47f4-92ef-623e9351810c',
  })
  readonly id: string;

  @ApiProperty({
    example: '犬のお散歩',
  })
  title: string;

  @ApiProperty({
    example: '犬をお外に連れて行く',
  })
  description?: string;

  @ApiProperty({
    enum: ['yet', 'in_progress', 'done'],
    example: 'yet',
  })
  status?: 'yet' | 'in_progress' | 'done';

  @ApiProperty({
    nullable: true,
    example: '2011-10-05T14:48:00.000Z',
  })
  deadline?: Date | null;

  @ApiProperty({
    nullable: true,
    example: '2011-10-05T14:48:00.000Z',
  })
  completedAt?: Date | null;

  @ApiProperty({
    example: 12,
  })
  workingHours?: number;

  @ApiProperty({
    example: 'c7eef771-c9c9-47f4-92ef-623e9351810c',
  })
  createdBy: string;
}
