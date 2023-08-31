import { IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class IdentityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
export abstract class BaseEntity extends IdentityEntity {
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true, default: 'ADMIN' })
  createdBy?: string;

  @Column({ nullable: true, default: 'ADMIN' })
  updatedBy?: string;
}
