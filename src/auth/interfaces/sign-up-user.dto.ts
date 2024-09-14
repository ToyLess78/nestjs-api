import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
  @ApiProperty({ example: 'Arthur Dent' })
  fullName: string;

  @ApiProperty({ example: 'arthur.dent@mail.com' })
  email: string;

  @ApiProperty({ example: 'pa$Sword' })
  password: string;
}
