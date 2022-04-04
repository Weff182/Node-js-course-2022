import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from './user-roles/user-roles.model';
import { Users } from '../users/users.model';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Уникальное значение рольи пользователя',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  description: string;

  @BelongsToMany(() => Users, () => UserRoles)
  users: Users[];
}
