import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body) {
    const { email, password, fullName } = body;
    return this.authService.signUp(email, password, fullName);
  }

  @Post('sign-in')
  async signIn(@Body() body) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('authenticated-user')
  getAuthenticatedUser(@Request() req) {
    const user = this.authService.findUser(req.user.id);
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('authenticated-user')
  deleteAuthenticatedUser(@Request() req) {
    return this.authService.deleteUser(req.user.id);
  }
}
