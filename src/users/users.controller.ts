import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Users')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'View all Users (Admin) ' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'View All Users successfully',
    type: UserEntity,
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiTags('Users')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'View User (Admin / Cutomer) ' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'View User successfully',
    type: UserEntity,
  })
  @Get(':id')
  findOnebyUser(@Param('id') id: string) {
    return this.usersService.findOnebyUser(+id);
  }

  @ApiTags('Users')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Update User (Admin / Customer) ' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Updated User successfully',
    type: UserEntity,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiTags('Users')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update User (Admin) ' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Delete User successfully',
    type: UserEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
