import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        JwtService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user and return user data with a token', async () => {
      const email = 'test@mail.com';
      const password = 'test123';
      const fullName = 'Test User';

      const hashedPassword = await bcrypt.hash(password, 8);

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create').mockReturnValue({
        id: '1',
        email,
        fullName,
        password: hashedPassword,
        createdAt: new Date(),
      } as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue({
        id: '1',
        email,
        fullName,
        password: hashedPassword,
        createdAt: new Date(),
      } as User);
      jest.spyOn(jwtService, 'sign').mockReturnValue('signed-token');

      const result = await authService.signUp(email, password, fullName);

      expect(result).toEqual({
        user: {
          id: '1',
          email,
          fullName,
          createdAt: expect.any(Date),
        },
        token: 'signed-token',
      });
    });

    it('should throw an error if email already exists', async () => {
      const email = 'test@mail.com';
      const password = 'test123';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: '1',
        email,
        password,
        fullName: 'Test User',
        createdAt: new Date(),
      } as User);

      await expect(authService.signUp(email, password)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('signIn', () => {
    it('should return user data with a token on successful login', async () => {
      const email = 'test@mail.com';
      const password = 'test123';
      const hashedPassword = await bcrypt.hash(password, 8);

      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: '1',
        email,
        password: hashedPassword,
        fullName: 'Test User',
        createdAt: new Date(),
      } as User);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(jwtService, 'sign').mockReturnValue('signed-token');

      const result = await authService.signIn(email, password);

      expect(result).toEqual({
        user: {
          id: '1',
          email,
          fullName: 'Test User',
          createdAt: expect.any(Date),
        },
        token: 'signed-token',
      });
    });

    it('should throw an error if credentials are invalid', async () => {
      const email = 'test@mail.com';
      const password = 'test123';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(authService.signIn(email, password)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
