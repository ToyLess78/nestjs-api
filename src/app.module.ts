import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trips/trip.module';
import { User } from './auth/entities/user.entity';
import { Trip } from './trips/entities/trip.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:hfswBkhUiCkHctUXPTPNHmwOMezIukpk@postgres.railway.internal:5432/railway',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Trip],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    TripModule,
  ],
})
export class AppModule {}
