import { state } from 'src/interfaces/taskInterface';
export declare class CreateTaskDto {
    task: string;
    description: string;
    state: state;
    userId: number;
}
