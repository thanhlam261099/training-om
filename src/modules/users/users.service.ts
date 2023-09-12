import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserNotFoundExeption } from 'src/common/exeptions/UserNotFound.exeption';
import { GetAllUserDto, GetUserDetailDto } from './dto/get-users.dto';
import { DEFAULT_PASSWORD } from 'src/common/constants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UsersService {
  roleRepository: any;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const { username, email, roles } = createUser;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('email already exists');
    }

    const defaultPassword = DEFAULT_PASSWORD;
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const user = new UserEntity();
    const role = roles.map((e) => e.id);
    const roleList = await this.roleService.getRoleByIds(role);

    (user.username = username),
      (user.email = email),
      (user.password = hashedPassword),
      (user.roles = roleList);

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findUserById(userId: string): Promise<GetUserDetailDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { roles: true },
    });

    if (!user) {
      throw new UserNotFoundExeption();
    }
    return plainToInstance(GetUserDetailDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getAllUsers(): Promise<GetAllUserDto[]> {
    const users: UserEntity[] = await this.userRepository.find({
      relations: {
        roles: true,
      },
    });

    return plainToInstance(GetAllUserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new UserNotFoundExeption();
    }

    Object.assign(user, updateUserDto);
    if (updateUserDto.id) {
      const role = await this.roleRepository.findOne(updateUserDto.id);
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      user.roles = role;
    }
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UserNotFoundExeption();
    }

    const isOldPasswordValid = await this.comparePasswords(
      oldPassword,
      user.password,
    );
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('incorrect old password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await this.userRepository.save(user);
  }
}
