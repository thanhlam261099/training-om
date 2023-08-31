import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserNotFoundExeption } from 'src/common/exeptions/UserNotFound.exeption';
import { GetAllDto } from './dto/get-all-users.dto';
import { RoleEntity } from 'src/domain/entities';
import { DEFAULT_PASSWORD } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const { username, email } = createUser;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('email already exists');
    }

    const defaultPassword = DEFAULT_PASSWORD;
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async findUserById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundExeption();
    }
    return user;
  }

  async getAllUsers(): Promise<GetAllDto[]> {
    const users: UserEntity[] = await this.userRepository.find({
      relations: {
        roles: true,
      },
    });

    return plainToInstance(GetAllDto, users, {
      excludeExtraneousValues: true,
    });
    // return users;
  }

  async findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new UserNotFoundExeption();
    }

    const { email } = updateUserDto;

    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already exist');
    }

    const userUpdate: Partial<UserEntity> = {
      ...user,
      ...updateUserDto,
    };

    // if(updateUserDto.roleIds) {
    //   const roles: RoleEntity[] =
    // }
    return await this.userRepository.save(userUpdate);
  }

  async deleteUser(userId: string) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new UserNotFoundExeption();
    }

    await this.userRepository.remove(user);
    return 'User deleted';
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UserNotFoundExeption();
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await this.userRepository.save(user);
  }
}
