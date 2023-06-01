import { Controller, Get, Post, Query, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role-guard';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role, Category } from '@prisma/client';
import { AuthGuard, } from '@nestjs/passport';

@ApiTags('Categories')
@Controller('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 201, description: 'Category created successfully', type: CategoryEntity })
  @ApiBearerAuth()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }
  @Get()
  @ApiQuery({ name: 'q', required: false })
  @ApiResponse({ status: 200, description: 'Category found', type: CategoryEntity })
  async getAllCategories(@Query('q') query: string): Promise<CategoryEntity[]> {
  if (query) {
    return this.categoryService.getAllCategories(query);
  }
  return this.categoryService.getAllCategories();
}


  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 200, description: 'Category updated successfully', type: CategoryEntity })
  @ApiBearerAuth()
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
}
