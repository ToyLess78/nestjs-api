import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '6288f90c2683168b8e95c372' })
  id: string;

  @ApiProperty({ example: 'Arthur Dent' })
  fullName: string;

  @ApiProperty({ example: 'arthur.dent@mail.com' })
  email: string;

  @ApiProperty({ example: '2022-05-21T14:37:00.049Z' })
  createdAt: Date;
}
