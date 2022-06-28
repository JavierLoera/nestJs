import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Patch,
  Body,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task,service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getTasks(): Promise<any> {
    return this.taskService.getTasks();
  }

  @Get(':idTask')
  getTaskByid(@Param('idTask', ParseIntPipe) idTask: number) {
    return this.taskService.getTaskId(idTask);
  }

  @Post('changestate:idTask')
  changeTaskState(@Param('idTask', ParseIntPipe) idTask: number) {
    return this.taskService.changeStateCompleted(idTask);
  }

  @Post('addtask')
  AddTask(@Body() body: CreateTaskDto) {
    return this.taskService.addTask(body);
  }

  @Delete(':idTask')
  deleteTask(@Param('idTask', ParseIntPipe) idTask: number) {
    return this.taskService.deleteTask(idTask);
  }

  @Patch(':idTask')
  UpdateTask(
    @Param('idTask', ParseIntPipe) idTask: number,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.UpdateTask(idTask, body);
  }
}
