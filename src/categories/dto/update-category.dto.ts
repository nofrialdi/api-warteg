import { PartialType, ApiProperty } from '@nestjs/swagger';
import {  IsString } from 'class-validator';

export class UpdateCategoryDto  {
        @IsString()
        @ApiProperty()
        name: string;
      }