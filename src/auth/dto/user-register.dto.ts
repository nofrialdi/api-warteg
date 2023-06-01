import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({ description: 'The username of the user.' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The password of the user.' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'The role of the user.' })
  @IsNotEmpty()
  role: 'CUSTOMER' | 'ADMIN';

  @ApiProperty({ description: 'The address of the user.' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'The email of the user.' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the user.' })
  @IsNotEmpty()
  phoneNumber: string;
}
