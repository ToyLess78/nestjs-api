import { IsUUID, IsInt, IsDateString, Min, Max } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  tripId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  guests: number;

  @IsDateString()
  date: string;
}
