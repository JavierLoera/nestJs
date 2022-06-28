import { Model } from 'sequelize-typescript';
import { Iuser } from 'src/interfaces/userInterface';
import { Task } from './task.entity';
export declare class User extends Model<Iuser> {
    id: number;
    email: string;
    password: string;
    tasks: Task[];
}
