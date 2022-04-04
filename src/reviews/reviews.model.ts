import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Vinyls } from '../vinyls/vinyl.model';
import { Users } from '../users/users.model';

@Table({ tableName: 'reviews' })
export class Reviews extends Model<Reviews> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Супер пластинка', description: 'Описание' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ForeignKey(() => Vinyls)
  @Column({ type: DataType.INTEGER })
  vinylId: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => Vinyls)
  vinyl: Vinyls;

  @BelongsTo(() => Vinyls)
  user: Users;
}
