import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({ example: 'Arthur Dent' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'arthur.dent@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'pa$Sword' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
