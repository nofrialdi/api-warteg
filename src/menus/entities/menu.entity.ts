import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Category, Menu } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class MenuEntity implements Menu {
  constructor(partial: Partial<MenuEntity> | Partial<MenuEntity[]>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  picture: string;

  @ApiProperty()
  price: number;

  @Exclude()
  categoryId: string;
  

  @Exclude()
  userId: number;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

}