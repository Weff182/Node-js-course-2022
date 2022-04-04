import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Vinyls } from '../vinyls/vinyl.model';
import { UserRoles } from '../roles/user-roles/user-roles.model';
import { Role } from '../roles/roles.model';

import { UserVinyls } from '../vinyls/vynil-user/user-vinyls.model';
import { Reviews } from '../reviews/reviews.model';

@Table({ tableName: 'users' })
export class Users extends Model<Users> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'pass123', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Maksim', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Zhuk', description: 'Фамилия пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: '1996-04-20', description: 'День Рождения' })
  @Column({ type: DataType.DATE, allowNull: false })
  birthdate: Date;

  @ApiProperty({ example: 'avatarimg', description: 'Аватар' })
  @Column({ type: DataType.STRING })
  avatar: string;

  @ApiProperty({ example: 'userIdCustomer', description: '12312' })
  @Column({ type: DataType.STRING })
  stripeCustomerId: string;

  @BelongsToMany(() => Vinyls, () => UserVinyls)
  vinyls: Vinyls[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Reviews)
  reviews: Reviews[];
}
