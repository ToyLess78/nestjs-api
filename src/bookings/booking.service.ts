import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../trips/entities/trip.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { differenceInDays } from 'date-fns';
import { Booking } from './entities/bookings.entity';
import { ExceptionMessages } from './constants/exception-messages';
import { BookingResponse } from './interfaces/booking-response.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async findAll(userId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { userId },
      relations: ['trip'],
    });
  }

  async create(
    createBookingDto: CreateBookingDto,
    userId: string,
  ): Promise<BookingResponse> {
    const { tripId, guests, date } = createBookingDto;

    const trip = await this.tripRepository.findOne({ where: { id: tripId } });

    if (!trip) {
      throw new NotFoundException(ExceptionMessages.TRIP_NOT_FOUND);
    }

    const today = new Date();
    const bookingDate = new Date(date);
    if (differenceInDays(bookingDate, today) < 1) {
      if (differenceInDays(bookingDate, today) < 1) {
        throw new BadRequestException(ExceptionMessages.INVALID_BOOKING_DATE);
      }
    }

    const booking = this.bookingRepository.create({
      tripId,
      userId,
      guests,
      date: bookingDate,
    });

    await this.bookingRepository.save(booking);

    return {
      id: booking.id,
      userId: booking.userId,
      tripId: booking.tripId,
      guests: booking.guests,
      date: booking.date,
      trip: {
        title: trip.title,
        duration: trip.duration,
        price: trip.price,
      },
      totalPrice: trip.price * guests,
      createdAt: booking.createdAt,
    };
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.bookingRepository.delete({ id, userId });
    return result.affected > 0;
  }
}
