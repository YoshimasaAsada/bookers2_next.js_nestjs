/* data transfer object
クライアントから送られてくるデータのこと。 */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
