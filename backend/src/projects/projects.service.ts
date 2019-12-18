import { Injectable } from '@nestjs/common';
import { Project } from './models/projects.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: ReturnModelType<typeof Project>,
  ) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectModel.create({ ...createProjectDto });
  }
}
