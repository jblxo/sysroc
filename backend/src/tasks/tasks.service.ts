import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TasksFilter } from './filters/tasks.filter';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/projects.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createOne(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      project: null,
    });
    newTask.project = await this.projectRepository.findOne(
      createTaskDto.project,
      { relations: ['tasks'] },
    );
    await this.taskRepository.save(newTask);
    newTask.project = await this.projectRepository.findOne(
      createTaskDto.project,
      { relations: ['tasks'] },
    );
    return newTask;
  }

  async deleteOne(filter: TasksFilter): Promise<TaskDto> {
    const task = await this.taskRepository.findOne(filter.id);
    if (!task) {
      throw new NotFoundException(`Could not find task with given ID!`);
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
  ): Promise<TaskDto> {
    const task = await this.taskRepository.findOne(filter.id);

    if (!task) {
      throw new NotFoundException(`Could not find task with given ID!`);
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
