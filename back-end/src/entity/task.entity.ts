import {
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType
} from 'sequelize-typescript';
import { Itask, state } from '../interfaces/taskInterface';
import { User } from './user.entity';

@Table
export class Task extends Model<Itask> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;
  @Column({  type: DataType.STRING,
    allowNull: false,})
  task: string;
  @Column({  type: DataType.STRING,
    allowNull: false,})
  description: string;
  @Column
  state: state;
  @ForeignKey(() => User)
  @Column({
      type: DataType.INTEGER,
      allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

