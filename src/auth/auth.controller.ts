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
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExceptionMessages } from './constants/exception-messages';
import { Routes } from './constants/routes';
import { UserRequest } from './interfaces/user-request.interface';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { SignUpUserDto } from './interfaces/sign-up-user.dto';
import { SignInUserDto } from './interfaces/sign-in-user.dto';
import { UserDto } from './interfaces/user.dto';

@ApiTags('auth')
@Controller(Routes.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiCreatedResponse({
    description: 'A user object and token',
    type: UserDto,
  })
  @ApiBody({ type: SignUpUserDto })
  @Post(Routes.SIGN_UP)
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(
      signUpUserDto.email,
      signUpUserDto.password,
      signUpUserDto.fullName,
    );
  }

  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiOkResponse({
    description: 'A user object and token',
    type: UserDto,
  })
  @ApiBody({ type: SignInUserDto })
  @Post(Routes.SIGN_IN)
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto.email, signInUserDto.password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user' })
  @ApiOkResponse({
    description: 'A user object',
    type: UserDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get(Routes.AUTHENTICATED_USER)
  async getAuthenticatedUser(@Req() req: UserRequest) {
    const user = await this.authService.findUser(req.user.id);
    if (!user) {
      throw new BadRequestException(ExceptionMessages.USER_NOT_FOUND);
    }
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete authenticated user' })
  @ApiOkResponse({
    description: 'Is user deleted',
    schema: {
      example: true,
    },
  })
  @UseGuards(JwtAuthGuard)
  @Delete(Routes.AUTHENTICATED_USER)
  async deleteAuthenticatedUser(@Req() req: UserRequest) {
    return await this.authService.deleteUser(req.user.id);
  }
}
