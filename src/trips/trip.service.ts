import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { tripMockData } from './mock-data/trips.mock-data';

@Injectable()
export class TripService implements OnModuleInit {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async onModuleInit() {
    const count = await this.tripRepository.count();
    if (count === 0) {
      await this.tripRepository.save(tripMockData);
    }
  }

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find();
  }

  async findOne(id: string): Promise<Trip> {
    const trip = await this.tripRepository.findOne({ where: { id } });
    if (!trip) {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }
    return trip;
  }

  async create(tripData: Partial<Trip>): Promise<Trip> {
    const trip = this.tripRepository.create(tripData);
    return this.tripRepository.save(trip);
  }
}
