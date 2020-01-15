import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Task } from './models/tasks.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { Project } from '../projects/models/projects.model';
import { TasksFilter } from './filters/tasks.filter';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: ReturnModelType<typeof Task>,
    @InjectModel(Project)
    private readonly projectModel: ReturnModelType<typeof Project>,
  ) {}

  async createOne(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const newTask = await this.taskModel.create({
      ...createTaskDto,
    });

    const project = await this.projectModel
      .findById(createTaskDto.project)
      .exec();

    project.tasks.push(newTask);
    await project.save();

    // TODO: add sorting
    return newTask
      .populate([
        {
          path: 'project',
          model: 'Project',
          populate: {
            path: 'tasks',
            model: 'Task',
          },
        },
      ])
      .execPopulate();
  }

  deleteOne(filter: TasksFilter): Promise<TaskDto> {
    return this.taskModel.findByIdAndDelete(filter._id).exec();
  }

  async updateOne(
    filter: TasksFilter,
    updates: UpdateTaskDto,
  ): Promise<TaskDto> {
    return this.taskModel.findOneAndUpdate(filter, updates).exec();
  }

  getOne(filter: TasksFilter): Promise<TaskDto> {
    return this.taskModel.findById(filter._id).exec();
  }
}
