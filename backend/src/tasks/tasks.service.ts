import { Injectable, NotImplementedException } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { Project } from '../projects/entities/projects.entity';
import { TasksFilter } from './filters/tasks.filter';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  async createOne(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    // TODO: implement
    throw new NotImplementedException();
  }

  async deleteOne(filter: TasksFilter): Promise<TaskDto> {
    // TODO: implement
    throw new NotImplementedException();
  }

  async updateOne(
    filter: TasksFilter,
    updates: UpdateTaskDto,
  ): Promise<TaskDto> {
    // TODO: implement
    throw new NotImplementedException();
  }

  async getOne(filter: TasksFilter): Promise<TaskDto> {
    // TODO: implement
    throw new NotImplementedException();
  }
}
