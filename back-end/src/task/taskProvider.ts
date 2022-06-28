import { Task } from '../entity/task.entity';

export const taskProvider = [
  {
    provide: 'TASK_REPOSITORY',
    useValue: Task,
  },
];
