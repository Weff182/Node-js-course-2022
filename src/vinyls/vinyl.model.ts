import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserVinyls } from './vynil-user/user-vinyls.model';
import { Reviews } from '../reviews/reviews.model';
import { Users } from '../users/users.model';

@Table({ tableName: 'vinyls' })
export class Vinyls extends Model<Vinyls> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Adam's song", description: 'Название' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'blink 182', description: 'Автор' })
  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @ApiProperty({ example: 'img182', description: 'Обложка винила' })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({
    example: 'song from album enema of the state',
    description: 'Описание',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: '1200', description: 'Стоимость' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @BelongsToMany(() => Users, () => UserVinyls)
  users: Users[];

  @HasMany(() => Reviews)
  reviews: Reviews[];
}
