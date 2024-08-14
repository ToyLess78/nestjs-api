import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trips/trip.module';
import { User } from './auth/entities/user.entity';
import { Trip } from './trips/entities/trip.entity';
import { config } from './auth/constants/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: config(configService).databaseUrl,
          autoLoadEntities: true,
          synchronize: true,
          entities: [User, Trip],
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
    AuthModule,
    TripModule,
  ],
})
export class AppModule {}
