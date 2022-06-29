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
  async getTasks(userid: number): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll({
      where: { userId: userid },
    });
    return tasks;
  }
  async getTaskId(idTask: number): Promise<Task> {
    const task = await Task.findOne({ where: { id: idTask } });
    return task;
  }

  async changeStateCompleted(idTask: number) {
    const task = await Task.findOne({ where: { id: idTask } });
    task.state = state.completed;
    task.save();
  }
  async addTask(task: CreateTaskDto) {
    task.state = state.active;
    return await this.taskRepository.create(task);
  }

  async deleteTask(id: number, userId: number) {
    return await this.taskRepository.destroy({ where: { id, userId: userId } });
  }

  async UpdateTask(id: number, task: UpdateTaskDto, userId: number) {
    task.state = state.active;
    return await this.taskRepository.update(task, { where: { id, userId } });
  }
}
