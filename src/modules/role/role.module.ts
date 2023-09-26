import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/domain/entities';
import { PermissionsModule } from '../permissions/permissions.module';
import { JwtStrategy } from 'src/common/strategy/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), PermissionsModule],
  providers: [RoleService, JwtStrategy],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
