import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRequest } from '../auth/interfaces/user-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async findAll(@Req() req: UserRequest) {
    return this.bookingService.findAll(req.user.id);
  }

  @Post()
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: UserRequest,
  ) {
    return this.bookingService.create(createBookingDto, req.user.id);
  }

  @Delete(':bookingId')
  async remove(@Param('bookingId') bookingId: string, @Req() req: UserRequest) {
    return this.bookingService.remove(bookingId, req.user.id);
  }
}
