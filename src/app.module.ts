import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { MenusModule } from './menus/menus.module';
import { CategoryModule } from './categories/categories.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MailService } from './mail/mail.service';
import { UnsplashModule } from './menus/unsplash.module';
import { UnsplashService } from './menus/unsplash.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoryModule,
    MenusModule,
    OrdersModule,
    PrismaModule,
    UnsplashModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MailService, UnsplashService],
})
export class AppModule {}
