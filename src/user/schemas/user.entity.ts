import { UUIDVersion } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion = 4;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: false })
  user_name: string;

  @Column()
  avatar: string;

  @Column()
  address: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column('timestamp')
  dob: Date;

  @Column({ unique: true, nullable: false })
  phone_number: string;

  @Column({ nullable: false })
  role: number;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ unique: true, nullable: true })
  updated_by: string;

  @Column('timestamp', { nullable: true })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
