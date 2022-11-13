import {
  HttpException,
  HttpStatus,
  Injectable,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './schemas/user.entity';
import { User } from './dto/user.interface';
import { UserFormDTO } from './dto/userDTO.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/userLogin.dto';
import jwtServices from 'src/middleware/Jwt/Jwt.services';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
  ) {}

  async findOne(
    id: string | any,
  ): Promise<{ data: UserModel; message_code: number }> {
    const profile: any = await this.usersRepository.findOne({
      where: { id },
    });
    delete profile.password;
    return {
      data: profile,
      message_code: 200,
    };
  }
  findAll(query: any): Promise<[UserModel[], number]> {
    return this.usersRepository.findAndCount(query || {});
  }

  async create(user: User | any): Promise<UserFormDTO | any> {
    const hashPassword = await bcrypt.hash(user.password, 10);
    if (!hashPassword) {
      throw new Error('Hash Password Fail!');
    }
    user.password = hashPassword;
    const newUser: any = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  updated(): Promise<UserModel[]> {
    return;
  }

  async login(loginForm: LoginDTO) {
    try {
      // get data
      const getUser = await this.usersRepository.findOne({
        where: {
          user_name: loginForm.user_name,
        },
      });

      if (!getUser) {
        throw new NotFoundException('User or Password not correct!');
      }
      // check pass
      const passwordIsValid = await bcrypt.compare(
        loginForm.password,
        getUser.password,
      );

      if (!passwordIsValid) {
        throw new NotFoundException('User or Password not correct!');
      }
      // remove password response
      delete getUser.password;

      const { id }: any = getUser;
      const token = await jwtServices.generateToken(id);

      return {
        data: {
          ...getUser,
          token: token,
        },
        message_code: 200,
      };
    } catch (error) {
      console.log(error);

      throw new NotFoundException('User or Password not correct!');
    }
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
