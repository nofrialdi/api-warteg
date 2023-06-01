import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { UnsplashService } from './unsplash.service';
import { JwtService } from '@nestjs/jwt';
import { QueryMenu } from './dto/query-menu.dto';


@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService, private readonly unsplashService: UnsplashService, private readonly jwtService: JwtService) {}

  async getAllMenus(query?: string): Promise<QueryMenu[]> {
  return this.prisma.menu.findMany({
      where: {
        name: { contains: query|| ''},
      },
      include: {
 category: {
          select: {
            name: true,
          },
        },
  }});
  }

  async createMenu(createMenuDto: CreateMenuDto, request: Request): Promise<MenuEntity> {
    const { name, price, categoryId } = createMenuDto;
    const generatedPicture = await this.unsplashService.generatePictureByName(name);
    const picture = generatedPicture.urls.regular;
    const token = request.headers['authorization']?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Invalid token.');
  }

  const decodedToken = this.jwtService.decode(token) as { sub: number };
const userId = decodedToken.sub;

  return this.prisma.menu.create({
    data: {
      name,
      picture,
      price,
      categoryId,
      userId,
    },
    include: { category: true, user: true, orderItems: true },
  });
}

  async updateMenu(id: number, updateMenuDto: UpdateMenuDto) {
    const { name, price } = updateMenuDto;
    const generatedPicture = await this.unsplashService.generatePictureByName(name);
    const picture = generatedPicture.urls.regular;
    return this.prisma.menu.update( {where: {id},
      data: {
        name,
        picture,
        price,
      }
    });
  }

  async deleteMenu(id: number): Promise<MenuEntity | null> {
    return this.prisma.menu.delete( {where: { id }});
  }

}