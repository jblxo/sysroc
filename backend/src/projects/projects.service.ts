import { Injectable } from '@nestjs/common';
import { Project } from './models/projects.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/models/users.model';
import { ProjectsFilter } from './filters/project.filter';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: ReturnModelType<typeof Project>,
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    user: UserDto,
  ): Promise<Project> {
    const project = await this.projectModel.create({
      ...createProjectDto,
      user: user._id,
    });

    const userEntity = await this.userModel.findById(user._id).exec();
    userEntity.projects.push(project);
    await userEntity.save();

    const populatedProject = project.populate('user').execPopulate();
    return populatedProject;
  }

  async getMany(filter: ProjectsFilter): Promise<ProjectDto[]> {
    return this.projectModel
      .find(filter)
      .populate('user')
      .exec();
  }
}
