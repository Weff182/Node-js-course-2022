import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from '../../users/users.model';
import { Vinyls } from '../vinyl.model';

@Table({ tableName: 'user_vinyls', createdAt: false, updatedAt: false })
export class UserVinyls extends Model<UserVinyls> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @ForeignKey(() => Vinyls)
  @Column
  vinylId: number;
}
