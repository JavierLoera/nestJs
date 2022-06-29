import {
  Controller,
  Get,
  Param,
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
  @Get(':userid')
  getTasks(@Param('userid', ParseIntPipe) userid: number): Promise<any> {
    return this.taskService.getTasks(userid);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':idTask')
  getTaskByid(@Param('idTask', ParseIntPipe) idTask: number) {
    return this.taskService.getTaskId(idTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('changestate:idTask')
  changeTaskState(@Param('idTask', ParseIntPipe) idTask: number) {
    return this.taskService.changeStateCompleted(idTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addtask')
  AddTask(@Body() body: CreateTaskDto) {
    return this.taskService.addTask(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':idTask/:userId')
  deleteTask(
    @Param('idTask', ParseIntPipe) idTask: number,
    @Param('userId', ParseIntPipe)
    userId: number,
  ) {
    return this.taskService.deleteTask(idTask, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':idTask/:userId')
  UpdateTask(
    @Param('idTask', ParseIntPipe) idTask: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.UpdateTask(idTask, body, userId);
  }
}
