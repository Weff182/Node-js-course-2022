import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
//roles func
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
//DTO
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//Users func
import { Users } from './users.model';
import { UsersService } from './users.service';
//other
import { Request } from 'express';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Функция для просмотра профиля' })
  @ApiResponse({ status: 200, type: Users })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  seeProfile(@Req() req: Request): Promise<Users> {
    return this.usersService.getUserProfile(req);
  }

  @ApiOperation({ summary: 'Функция для апдейта профиля' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(FileInterceptor('image'))
  updateProfile(
    @Body() userDto: UpdateUserDto,
    @UploadedFile() image,
    @Req() req: Request,
  ): Promise<void> {
    return this.usersService.updateProfile(userDto, req, image);
  }

  @ApiOperation({ summary: 'Функция для получения всех пользователей' })
  @ApiResponse({ status: 200, type: [Users] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addUserRole(@Body() dto: AddRoleDto): Promise<void> {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto): Promise<void> {
    return this.usersService.banUser(dto);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
