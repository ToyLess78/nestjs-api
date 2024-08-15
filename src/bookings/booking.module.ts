import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Trip } from '../trips/entities/trip.entity';
import { Booking } from './entities/bookings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Trip])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
