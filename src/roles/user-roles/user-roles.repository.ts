import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoles } from './user-roles.model';

@Injectable()
export class UsersRolesRepository {
  constructor(
    @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles,
  ) {}

  async findUser(id: number) {
    return await this.userRolesRepository.findOne({ where: { id } });
  }

  async createUserRole(userId: number, roleId: number) {
    const entity = await this.userRolesRepository.findAll({
      where: { userId },
    });
    entity.forEach(function (el) {
      if (el.roleId === roleId) {
        throw new HttpException(
          'У пользователя уже есть данная роль',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    await this.userRolesRepository.create({ userId, roleId });
  }
}
