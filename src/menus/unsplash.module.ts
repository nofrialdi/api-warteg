import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UnsplashService } from './unsplash.service';

@Module({
  imports: [HttpModule],
  providers: [UnsplashService],
  exports: [UnsplashService],
})
export class UnsplashModule {}