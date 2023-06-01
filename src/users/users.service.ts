import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserLoginDto } from '../auth/dto/user-login.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: UserRegisterDto) {
    // Check if username already exists
    const existingUserWithUsername = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });
    if (existingUserWithUsername) {
      throw new BadRequestException('Username already exists');
    }

    // Check if email already exists
    const existingUserWithEmail = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUserWithEmail) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return this.buildUserResponse(newUser);
  }
  async validateUser(loginUserDto: UserLoginDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: loginUserDto.username },
          { email: loginUserDto.email },
        ],
      },
    });

    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      return this.buildUserResponse(user);
    }

    return null;
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    return user ? this.buildUserResponse(user) : undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return user ? this.buildUserResponse(user) : undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return user ? this.buildUserResponse(user) : undefined;
  }

  async updatePassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  buildUserResponse(user: User): User {
    const userResponse: User = { ...user };
    userResponse.password = undefined;
    return userResponse;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        address: true,
        email: true,
        phoneNumber: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`No user found with id: ${id}`);
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  findOnebyUser(id: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        orders: true || null,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found with id: ${id}`);
    }
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
