import { IsString, IsNumber } from 'class-validator';

export class DogDto {
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}
