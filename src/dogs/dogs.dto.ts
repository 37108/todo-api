import { Dog } from './dogs.interface';

export class CreateDogDto implements Dog {
  name: string;
  age: number;
  breed: string;
}
