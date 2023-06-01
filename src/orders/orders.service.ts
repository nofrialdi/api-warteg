import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, Order, Menu } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { OrderEntity } from './entities/order.entity';
import { Request } from 'express';
import { OrderItem } from './dto/order-item.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    request: Request,
  ): Promise<OrderEntity> {
    const { orderItems } = createOrderDto;

    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token.');
    }
    const decodedToken = this.jwtService.decode(token) as {
      sub: number;
      role: Role;
    };
    const userId = decodedToken.sub;

    const totalAmount = await this.calculateTotalAmount(orderItems);
    const createdOrder = await this.prismaService.order.create({
      data: {
        userId,
        amount: totalAmount,
        orderItems: {
          create: this.createOrderItemsData(orderItems),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return createdOrder;
  }

  async calculateTotalAmount(orderItems: OrderItem[]): Promise<number> {
    let totalAmount = 0;
    for (const orderItem of orderItems) {
      const { menuId, quantity } = orderItem;
      const menu = await this.prismaService.menu.findUnique({
        where: { id: menuId },
      });
      if (!menu) {
        throw new NotFoundException(`Menu with ID ${menuId} not found.`);
      }
      const amount = quantity * menu.price;
      totalAmount += amount;
    }
    return totalAmount;
  }

  createOrderItemsData(
    orderItems: OrderItem[],
  ): { menuId: number; quantity: number }[] {
    return orderItems.map((orderItem) => ({
      menuId: orderItem.menuId,
      quantity: orderItem.quantity,
    }));
  }
  async findAll() {
    return await this.prismaService.orderItem.findMany({
      select: {
        id: true,
        menuId: true,
        orderId: true,
        quantity: true,
      },
    });
  }

  findOne(id: string) {
    const orderItem = this.prismaService.orderItem.findUnique({
      where: {
        id,
      },
    });
    return orderItem;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { orderItems } = updateOrderDto;

    const updateOrderItemsData = orderItems.map((item) => ({
      where: { id: item.id },
      data: { quantity: item.quantity },
    }));

    const updatedOrder = await this.prismaService.order.update({
      where: { id },
      data: {
        orderItems: {
          updateMany: updateOrderItemsData,
        },
      },
      include: { orderItems: true },
    });

    return updatedOrder;
  }

  async remove(id: string) {
    const orderItem = await this.prismaService.orderItem.findUnique({
      where: { id },
    });

    return this.prismaService.orderItem.delete({
      where: { id },
    });
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
    userRole: Role,
  ): Promise<Order> {
    if (userRole !== Role.ADMIN) {
      throw new UnauthorizedException('Only admins can update order status.');
    }
    const order = await this.prismaService.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    return this.prismaService.order.update({
      where: { id },
      data: updateOrderStatusDto,
      include: { orderItems: true },
    });
  }
}
