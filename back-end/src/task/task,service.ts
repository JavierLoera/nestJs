import { Injectable, Inject } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { Task } from '../entity/task.entity';
import { state } from 'src/interfaces/taskInterface';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: typeof Task,
  ) {}
  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }
  async getTaskId(idTask: number):Promise<Task> {
    const task = await Task.findOne({ where: { id: idTask } });
    return task;
  }

  async changeStateCompleted(idTask:number){
    const task = await Task.findOne({ where: { id: idTask } });
    task.state=state.completed;
    task.save()
  }
  async addTask(task: CreateTaskDto) {
    task.state = state.active;
    return await this.taskRepository.create(task);
  }

  async deleteTask(id: number) {
    return await this.taskRepository.destroy({ where: { id } });
  }

  async UpdateTask(id: number, task: UpdateTaskDto) {
    task.state = state.active;
    return await this.taskRepository.update(task, { where: { id } });
  }
}
