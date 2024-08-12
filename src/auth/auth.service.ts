import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private users = [];

  constructor(private jwtService: JwtService) {}

  async signUp(email: string, password: string, fullName?: string) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      fullName: fullName || '',
      createdAt: new Date(),
    };
    this.users.push(user);

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
    const user = this.users.find((user) => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
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

  private generateToken(user: any) {
    const payload = { id: user.id };
    return this.jwtService.sign(payload);
  }

  findUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < initialLength;
  }
}
