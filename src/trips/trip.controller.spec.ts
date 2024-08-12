import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TripModule } from './trip.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { AuthModule } from '../auth/auth.module';

describe('TripController', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let tripRepository: Repository<Trip>;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Trip],
          synchronize: true,
        }),
        TripModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    tripRepository = moduleFixture.get<Repository<Trip>>(
      getRepositoryToken(Trip),
    );

    token = jwtService.sign({ id: 'test-user-id' });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await tripRepository.clear();
  });

  describe('GET /trips', () => {
    it('should return an array of trips', async () => {
      await tripRepository.save([
        {
          id: '1',
          title: 'Iceland',
          description: 'Discover Iceland...',
          level: 'easy',
          duration: 15,
          price: 4795,
          image: 'https://example.com/iceland.jpg',
          createdAt: new Date(),
        },
      ]);

      const response = await request(app.getHttpServer())
        .get('/trips')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        id: '1',
        title: 'Iceland',
      });
    });

    it('should return 401 if no token is provided', () => {
      return request(app.getHttpServer()).get('/trips').expect(401); // Очікуємо статус 401
    });
  });

  describe('GET /trips/:tripId', () => {
    it('should return a single trip by ID', async () => {
      await tripRepository.save({
        id: '1',
        title: 'Iceland',
        description: 'Discover Iceland...',
        level: 'easy',
        duration: 15,
        price: 4795,
        image: 'https://example.com/iceland.jpg',
        createdAt: new Date(),
      });

      const response = await request(app.getHttpServer())
        .get('/trips/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: '1',
        title: 'Iceland',
      });
    });

    it('should return 404 if the trip is not found', () => {
      return request(app.getHttpServer())
        .get('/trips/999')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('should return 401 if no token is provided', () => {
      return request(app.getHttpServer()).get('/trips/1').expect(401);
    });
  });
});
