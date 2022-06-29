import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { Task } from '../entity/task.entity';
export declare class TaskService {
    private taskRepository;
    constructor(taskRepository: typeof Task);
    getTasks(userid: number): Promise<Task[]>;
    getTaskId(idTask: number): Promise<Task>;
    changeStateCompleted(idTask: number): Promise<void>;
    addTask(task: CreateTaskDto): Promise<Task>;
    deleteTask(id: number, userId: number): Promise<number>;
    UpdateTask(id: number, task: UpdateTaskDto, userId: number): Promise<[affectedCount: number]>;
}
