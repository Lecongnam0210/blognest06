import {
  HttpException,
  HttpStatus,
  Injectable,
  HttpCode,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './schemas/user.entity';
import { User } from './dto/user.interface';
import { UserFormDTO } from './dto/userDTO.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
  ) {}

  async findOne(id: string | any): Promise<UserModel[]> {
    return this.usersRepository.findBy({ id: id });
  }
  findAll(query: any): Promise<[UserModel[], number]> {
    return this.usersRepository.findAndCount(query || {});
  }

  async create(user: User): Promise<UserFormDTO> {
    const hashPassword = await bcrypt.hash(user.password, 10);
    if (!hashPassword) {
      throw new Error('Hash Password Fail!');
    }
    user.password = hashPassword;
    return this.usersRepository.save(user);
  }

  updated(): Promise<UserModel[]> {
    return;
  }

  @HttpCode(200)
  async deleted(id: string) {
    const data = await this.usersRepository.softDelete(id);
    if (!data?.affected) {
      throw new HttpException('Deleted Failed', HttpStatus.BAD_REQUEST);
    }
    return {
      status_code: 200,
      message: 'Delete Success',
    };
  }
}
