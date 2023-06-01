import { CreateOrderDto } from "./create-order.dto";
import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
    id: string;
    @ApiProperty()
    menuId: number;
    orderId: number;
    @ApiProperty()
    quantity: number;
}