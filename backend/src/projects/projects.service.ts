import { Injectable } from '@nestjs/common';
import { Project } from './models/projects.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: ReturnModelType<typeof Project>,
  ) {}

  create(createProjectDto: CreateProjectDto, user: UserDto): Promise<Project> {
    return this.projectModel.create({ ...createProjectDto, user: user._id });
  }
}
