import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Функция для создание ролей' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<void> {
    return this.roleService.createRole(dto);
  }
}
