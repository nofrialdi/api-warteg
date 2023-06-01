
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ description: 'The id of the user.'})
  id: number;

  @ApiProperty({ description: 'The username of the user.'})
  username: string;

  @ApiProperty({ description: 'The password of the user.'})
  password: string;

  @ApiProperty({ description: 'The role of the user.'})
  role: Role;

  @ApiProperty({ description: 'The email of the user.'})
  email: string;
}
