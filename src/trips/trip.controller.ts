import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TripService } from './trip.service';
import { Trip } from './entities/trip.entity';
import { TripRoutes } from './constants/trips.routes';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(TripRoutes.BASE)
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get(TripRoutes.GET_ALL)
  async findAll(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  @Get(TripRoutes.GET_ONE)
  async findOne(@Param('tripId') tripId: string): Promise<Trip> {
    return this.tripService.findOne(tripId);
  }
}
