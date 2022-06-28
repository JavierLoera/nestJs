import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { state } from 'src/interfaces/taskInterface';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  state: state;
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
