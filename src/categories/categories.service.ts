import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {  UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories(query?: string): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query || '',
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        menus: true,
      },
    });
    return categories;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    return this.prisma.category.create({ data: { name }, include: { menus: true } });
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    const { name } = updateCategoryDto;

    return this.prisma.category.update({ where: { id }, data: { name }, include: { menus: true } });
  }

}
