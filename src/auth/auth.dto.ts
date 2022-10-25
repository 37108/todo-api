import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    example: 'john',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
    example: '1q2w3e',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
