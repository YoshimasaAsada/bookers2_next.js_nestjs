import { IsString, IsNotEmpty } from 'class-validator';
export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
