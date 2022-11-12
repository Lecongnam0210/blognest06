import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './schemas/user.entity';
import { AuthService } from './guard/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, AuthService])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
