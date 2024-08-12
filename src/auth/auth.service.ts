import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ExceptionMessages } from './constants/exception-messages';
import { UserDto } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string, fullName?: string) {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException(ExceptionMessages.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      fullName: fullName || '',
    });

    await this.usersRepository.save(user);

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
      },
      token: this.generateToken(user),
    };
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException(ExceptionMessages.INVALID_CREDENTIALS);
    }

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
      },
      token: this.generateToken(user),
    };
  }

  private generateToken(user: UserDto) {
    const payload = { id: user.id };
    return this.jwtService.sign(payload);
  }

  async findUser(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected > 0;
  }
}
