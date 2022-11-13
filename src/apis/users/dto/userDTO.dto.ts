import {
  IsString,
  IsInt,
  IsEmail,
  IsUUID,
  Matches,
  IsDateString,
} from 'class-validator';

export class UserFormDTO {
  @IsUUID()
  id?: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  user_name: string;

  @IsString()
  avatar?: string;

  @IsString()
  address?: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

  @IsDateString()
  dob: Date;

  @IsString()
  phone_number: string;

  @IsInt()
  role?: number;

  @IsUUID()
  updated_by: string;
}
