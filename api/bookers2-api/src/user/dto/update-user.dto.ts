import { isString } from 'class-validator';

export class UpdateUserDto {
  name: string;
  email: string;
  introduction: string;
}
