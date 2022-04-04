import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private roleRepository: RolesRepository) {}
  async createRole(dto: CreateRoleDto) {
    await this.roleRepository.create(dto);
    return;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.getRoleByValue(value);
    if (!role) {
      throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async createStartRole(): Promise<void> {
    await this.roleRepository.createStartRole();
  }
}
