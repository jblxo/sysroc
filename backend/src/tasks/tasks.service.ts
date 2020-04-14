import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TasksFilter } from './filters/tasks.filter';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/projects.entity';
import { UserDto } from '../users/dto/user.dto';
import { PERMISSIONS } from '../permissions/permissions';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}

  async createOne(
    createTaskDto: CreateTaskDto,
    user: UserDto,
  ): Promise<TaskDto> {
    const project = await this.projectRepository.findOne(
      createTaskDto.project,
      { relations: ['tasks', 'user'] },
    );

    if (project.user.id !== user.id && !await this.usersService.hasPermissions(user, PERMISSIONS.PROJECTS_MANAGE)) {
      throw new UnauthorizedException(`Missing permissions for adding a task to this project`);
    }

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      project: null,
    });
    newTask.project = project;
    await this.taskRepository.save(newTask);
    newTask.project = await this.projectRepository.findOne(
      createTaskDto.project,
      { relations: ['tasks'] },
    );
    return newTask;
  }

  async deleteOne(
    filter: TasksFilter,
    user: UserDto,
  ): Promise<TaskDto> {
    const task = await this.taskRepository.findOne(filter.id, { relations: ['project', 'project.user'] });
    if (!task) {
      throw new NotFoundException(`Could not find task with given ID!`);
    }

    if (task.project.user.id !== user.id && !await this.usersService.hasPermissions(user, PERMISSIONS.PROJECTS_MANAGE)) {
      throw new UnauthorizedException(`Missing permissions for deleting a task of this project`);
    }

    const res = await this.taskRepository.delete(filter.id);
    if (res.affected < 1) {
      throw new InternalServerErrorException(`Could not delete task!`);
    }

    return task;
  }

  async updateOne(
    filter: TasksFilter,
    updates: UpdateTaskDto,
    user: UserDto,
  ): Promise<TaskDto> {
    const task = await this.taskRepository.findOne(filter.id, { relations: ['project', 'project.user'] });

    if (!task) {
      throw new NotFoundException(`Could not find task with given ID!`);
    }

    if (task.project.user.id !== user.id && !await this.usersService.hasPermissions(user, PERMISSIONS.PROJECTS_MANAGE)) {
      throw new UnauthorizedException(`Missing permissions for updating a task of this project`);
    }

    const updateTask = { ...task, ...updates };
    const res = await this.taskRepository.update(filter.id, updateTask);

    if (!res || res.affected < 1) {
      throw new InternalServerErrorException(
        `Could not update task with given ID!`,
      );
    }

    return this.taskRepository.findOne(filter.id);
  }

  async getOne(filter: TasksFilter): Promise<TaskDto> {
    return this.taskRepository.findOne({ id: filter.id });
  }
}
