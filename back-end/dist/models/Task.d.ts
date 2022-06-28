import { Model } from 'sequelize-typescript';
import { Itask, state } from '../interfaces/taskInterface';
export declare class Task extends Model<Itask> {
    task: string;
    description: string;
    state: state;
}
