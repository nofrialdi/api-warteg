import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/role-guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Role, Order } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderEntity } from './entities/order.entity';
import { Request } from 'express';
import { OrderItem } from './dto/order-item.dto';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiBody({ type: OrderItem })
  @ApiBearerAuth()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() request: Request,
  ): Promise<OrderEntity> {
    return this.ordersService.createOrder(createOrderDto, request);
  }
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Order completed successfully',
    type: OrderEntity,
  })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const userRole: Role = Role.ADMIN;
    return this.ordersService.updateOrderStatus(
      id,
      updateOrderStatusDto,
      userRole,
    );
  }
}
