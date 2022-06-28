import {
  AutoIncrement,
  AllowNull,
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
  ForeignKey,
  DataType
} from 'sequelize-typescript';
import { Iuser } from 'src/interfaces/userInterface';
import { Task } from './task.entity';

@Table
export class User extends Model<Iuser> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
})
  email: string;
  @Column({type: DataType.STRING,
    allowNull: false})
  password: string;
  @HasMany(() => Task)
  tasks: Task[];
}


