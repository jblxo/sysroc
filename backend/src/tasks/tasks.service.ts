import {Injectable, NotImplementedException} from '@nestjs/common';
import {Task} from './entities/tasks.entity';
import {CreateTaskDto} from './dto/create-task.dto';
import {TaskDto} from './dto/task.dto';
import {TasksFilter} from './filters/tasks.filter';
import {UpdateTaskDto} from './dto/update-task.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Project} from '../projects/entities/projects.entity';

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
      @InjectRepository(Project) private readonly projectRepository: Repository<Project>
  ) {}

  async createOne(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const newTask = this.taskRepository.create({...createTaskDto, project: null});
    newTask.project = await this.projectRepository.findOne(createTaskDto.project);
    await this.taskRepository.save(newTask);
    return newTask;
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
