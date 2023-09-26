import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';
import { Expose } from 'class-transformer';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @Column({ unique: true })
  @Expose()
  permissionName: string;

  @Column({ nullable: true })
  @Expose()
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  @JoinTable()
  roles: RoleEntity[];
}
