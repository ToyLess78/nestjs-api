import { Trip } from '../../trips/entities/trip.entity';

export interface BookingResponse {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: Date;
  trip: Pick<Trip, 'title' | 'duration' | 'price'>;
  totalPrice: number;
  createdAt: Date;
}
