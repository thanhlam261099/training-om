import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permission.entity';
import { Expose } from 'class-transformer';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column({ unique: true })
  @Expose()
  roleName: string;

  @Column()
  description: string;

  @ManyToMany(() => PermissionEntity, {
    eager: true,
  })
  @JoinTable()
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity, (user) => user.roles)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
    },
  })
  users?: UserEntity[];
}
