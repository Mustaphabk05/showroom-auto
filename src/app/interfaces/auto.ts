import { BodyType } from './body-type';

export interface Auto {
  id: number;
  brand: string;
  model: string;
  bodyType: BodyType;
  price: number;
  power: number;
  photo: string;
  availability: number;
  description: string;
}
