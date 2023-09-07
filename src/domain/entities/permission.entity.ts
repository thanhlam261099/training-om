import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Expose } from 'class-transformer';
import { IsUppercase } from 'class-validator';
import { RoleEntity } from './role.entity';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @Column({ unique: true })
  @IsUppercase()
  permissionName: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
