import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserNotFoundExeption } from 'src/common/exeptions/UserNotFound.exeption';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // async createUser(createUser: CreateUserDto): Promise<UserEntity> {
  //   const { email } = createUser;
  //   const existingUser = await this.userRepository.findOne({
  //     where: { email },
  //   });
  //   if (existingUser) {
  //     throw new ConflictException('Email already exists');
  //   }

  //   // const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = new UserEntity();

  //   Object.assign(user, createUser);
  //   // const user = this.userRepository.create({
  //   //   email,
  //   //   password: hashedPassword,
  //   //   firstName,
  //   //   lastName,
  //   //   isAdmin,
  //   // });

  //   return await this.userRepository.save(user);
  // }

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const { username, email, password } = createUser;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('username already exists');
    }

    const defaultPassword = '1234';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async findUserById(id: number): Promise<CreateUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundExeption();
    }
    return user;
  }

  async getAllUser(): Promise<CreateUserDto[]> {
    const users = await this.userRepository.find();
    return plainToClass(CreateUserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
