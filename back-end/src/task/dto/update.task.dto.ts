import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { state } from 'src/interfaces/taskInterface';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  task: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  state: state;
}
