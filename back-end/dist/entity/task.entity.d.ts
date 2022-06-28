import { Model } from 'sequelize-typescript';
import { Itask, state } from '../interfaces/taskInterface';
import { User } from './user.entity';
export declare class Task extends Model<Itask> {
    id: number;
    task: string;
    description: string;
    state: state;
    userId: number;
    user: User;
}
