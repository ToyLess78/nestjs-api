import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({ example: 'arthur.dent@mail.com' })
  email: string;

  @ApiProperty({ example: 'pa$Sword' })
  password: string;
}
