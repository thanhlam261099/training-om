import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UserEntity } from 'src/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateFromEmail } from 'unique-username-generator';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.usersService.getUserInfo(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, user };
    console.log('usinfo', user);
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(registerUserDto: RegisterDto): Promise<UserEntity> {
    const { username, email, password } = registerUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async registerGoogleUser(user: RegisterDto) {
    try {
      const newUser = this.userRepository.create(user);
      newUser.username = generateFromEmail(user.email, 5);

      await this.userRepository.save(newUser);
      console.log('aaaaa', newUser);

      return this.generateJwt({
        sub: newUser,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async googleLogin(user: any) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.usersService.getUserInfo(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return {
      sub: userExists.id,
      email: userExists.email,
    };
  }
}
