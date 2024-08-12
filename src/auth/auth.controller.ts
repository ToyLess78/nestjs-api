import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Request as Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExceptionMessages } from './constants/exception-messages';
import { Routes } from './constants/routes';
import { UserRequest } from './interfaces/user-request.interface';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Routes.SIGN_UP)
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(
      authCredentialsDto.email,
      authCredentialsDto.password,
      authCredentialsDto.fullName,
    );
  }

  @Post(Routes.SIGN_IN)
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(
      authCredentialsDto.email,
      authCredentialsDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(Routes.AUTHENTICATED_USER)
  async getAuthenticatedUser(@Req() req: UserRequest) {
    const user = await this.authService.findUser(req.user.id);
    if (!user) {
      throw new BadRequestException(ExceptionMessages.USER_NOT_FOUND);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(Routes.AUTHENTICATED_USER)
  async deleteAuthenticatedUser(@Req() req: UserRequest) {
    return await this.authService.deleteUser(req.user.id);
  }
}
