import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class QueryMenu {

  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  picture: string;

  @ApiProperty()
  price: number;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

}