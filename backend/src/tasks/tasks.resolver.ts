import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TasksFilter } from './filters/tasks.filter';
import { UpdateTaskDto } from './dto/update-task.dto';

@Resolver('Tasks')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => TaskDto)
  createTask(@Args('input') input: CreateTaskDto): Promise<TaskDto> {
    return this.tasksService.createOne(input);
  }

  @Mutation(() => TaskDto)
  deleteTask(@Args('filter') filter: TasksFilter) {
    return this.tasksService.deleteOne(filter);
  }

  @Mutation(() => TaskDto)
  updateTask(
    @Args('filter') filter: TasksFilter,
    @Args('updates') updates: UpdateTaskDto,
  ) {
    return this.tasksService.updateOne(filter, updates);
  }

  @Query(() => TaskDto)
  task(@Args('filter') filter: TasksFilter) {
    return this.tasksService.getOne(filter);
  }
}
