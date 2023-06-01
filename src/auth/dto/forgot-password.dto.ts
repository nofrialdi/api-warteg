import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'The email of the user who forgot their password.',
    type: String,
  })
  @IsEmail()
  email: string;
}
