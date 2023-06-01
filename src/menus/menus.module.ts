import { Module } from '@nestjs/common';
import { MenuController } from './menus.controller';
import { CategoryController } from '../categories/categories.controller';
import { MenusService } from './menus.service';
import { CategoryService } from '../categories/categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { UnsplashService } from './unsplash.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [HttpModule],
  controllers: [MenuController, CategoryController,],
  providers: [MenusService, CategoryService, UnsplashService, PrismaService, JwtService],
})
export class MenusModule {}
