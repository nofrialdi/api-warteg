import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  phoneNumber: string;
}
