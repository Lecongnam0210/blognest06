import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';

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

      // module
      autoLoadEntities: true,
    }),
    UserModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
