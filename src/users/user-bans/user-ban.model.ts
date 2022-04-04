import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from '../users.model';

@Table({ tableName: 'user_bans', createdAt: false, updatedAt: false })
export class UserBans extends Model<UserBans> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
}
