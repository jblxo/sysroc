import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TasksFilter } from './filters/tasks.filter';

@Resolver('Tasks')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => TaskDto)
  async createTask(@Args('input') input: CreateTaskDto): Promise<TaskDto> {
    return this.tasksService.createOne(input);
  }

  @Mutation(() => TaskDto)
  async deleteTask(@Args('filter') filter: TasksFilter) {
    return this.tasksService.deleteOne(filter);
  }
}
