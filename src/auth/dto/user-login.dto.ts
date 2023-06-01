import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ description: 'The username of the user.', required: false })
  username?: string;

  @ApiProperty({ description: 'The email of the user.', required: false })
  email?: string;

  @ApiProperty({ description: 'The password of the user.' })
  @IsNotEmpty()
  password: string;
}
