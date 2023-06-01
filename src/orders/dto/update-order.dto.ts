import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from './order-item.dto';

export class UpdateOrderDto {
  //   id: string;
  //   @ApiProperty()
  //   menuId: number;
  //   orderId: number;
  //   @ApiProperty()
  //   quantity: number;
  @ApiProperty()
  orderItems: OrderItem[];
}
