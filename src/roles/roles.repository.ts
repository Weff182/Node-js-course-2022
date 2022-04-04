import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//models
import { Role } from './roles.model';
//DTO
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesRepository {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto): Promise<void> {
    await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }

  async createStartRole() {
    if ((await this.roleRepository.findAll()).length !== 0) {
      return;
    }
    const userRole = {
      value: 'USER',
      description: 'Пользователь',
    };
    const adminRole = {
      value: 'ADMIN',
      description: 'Админитсратор',
    };
    await this.roleRepository.create(userRole);
    await this.roleRepository.create(adminRole);
    return;
  }
}
