import { IsString, Matches } from 'class-validator';

export class LoginDTO {
  @IsString()
  user_name: string;

  @IsString()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
