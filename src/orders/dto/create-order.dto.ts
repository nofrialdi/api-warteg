import { OrderItem } from './order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto  {
@ApiProperty()
  orderItems: OrderItem[];
}