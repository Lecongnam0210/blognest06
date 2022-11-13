import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './posts.controller';
import { UserService } from './post.service';
import { UserModel } from './schemas/post.entity';
import { AuthService } from '../../middleware/guard/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, AuthService])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
