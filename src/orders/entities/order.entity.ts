import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OrderItem, StatusOrder } from '@prisma/client';


export class OrderEntity {
  id: string;

  @ApiProperty()
  @IsString()
  amount: number;

  @ApiProperty({ enum: StatusOrder })
  status: StatusOrder;

  @ApiProperty()
  orderItems: OrderItem[];


  createdAt: Date;

  
  updatedAt: Date;
}