import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './apis/users/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nestdb',
      // entities: [],
      synchronize: true,
      logging: false,
      poolSize: 10,
      connectTimeoutMS: 12000000,
      useUTC: true,
      logger: 'simple-console',
      // module
      cache: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
