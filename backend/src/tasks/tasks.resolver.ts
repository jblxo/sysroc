import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TasksFilter } from './filters/tasks.filter';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { HasPermissions } from '../users/decorators/has-permissions.decorator';
import { PERMISSIONS } from '../permissions/permissions';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../users/dto/user.dto';

@Resolver('Tasks')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => TaskDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_VIEW)
  createTask(
    @CurrentUser() user: UserDto,
    @Args('input') input: CreateTaskDto,
  ): Promise<TaskDto> {
    return this.tasksService.createOne(input, user);
  }

  @Mutation(() => TaskDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_VIEW)
  deleteTask(
    @Args('filter') filter: TasksFilter,
    @CurrentUser() user: UserDto,
  ) {
    return this.tasksService.deleteOne(filter, user);
  }

  @Mutation(() => TaskDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_VIEW)
  updateTask(
    @Args('filter') filter: TasksFilter,
    @Args('updates') updates: UpdateTaskDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.tasksService.updateOne(filter, updates, user);
  }

  @Query(() => TaskDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_VIEW)
  task(@Args('filter') filter: TasksFilter) {
    return this.tasksService.getOne(filter);
  }
}
