import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../../middleware/guard/auth.guard';
import { UserModel } from './schemas/user.entity';
import { Permission } from './schemas/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, Permission, AuthService])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
