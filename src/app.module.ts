import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { config } from 'dotenv';
import { RoleModule } from './modules/role/role.module';
import { PermissionsService } from './modules/permissions/permissions.service';
import { PermissionsController } from './modules/permissions/permissions.controller';
import { PermissionsModule } from './modules/permissions/permissions.module';

config();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.{js,ts}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    RoleModule,
    PermissionsModule,
  ],
})
export class AppModule {}
