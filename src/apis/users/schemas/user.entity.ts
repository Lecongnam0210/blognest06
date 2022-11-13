/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UUIDVersion } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  BeforeUpdate,
  AfterUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  AfterLoad,
  AfterInsert,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Permission } from "./role.entity";


@Entity({ name: 'tb_user' })
export class UserModel extends BaseEntity {
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

  @Column({ nullable: true })
  updated_by: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  @AfterLoad()
  full_name() {
    return this.first_name + ' ' + this.last_name;
  }

  @OneToOne((type) => Permission, (permission) => permission.id)
  @JoinColumn({ name: 'permission_id' })
  permission_id: Permission | any

  @BeforeInsert()
  updateDates() {
      this.permission_id = 1
  }
}
