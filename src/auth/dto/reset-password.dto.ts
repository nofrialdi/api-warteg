import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'The token received from the forgot password endpoint.',
    type: String,
  })
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'The new password.',
    type: String,
  })
  @IsNotEmpty()
  newPassword: string;
}
