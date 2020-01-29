import { Injectable, NotImplementedException } from '@nestjs/common';
import { Project } from './entities/projects.entities';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/entities/users.entity';
import { ProjectsFilter } from './filters/project.filter';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  async create(
    createProjectDto: CreateProjectDto,
    user: UserDto,
  ): Promise<ProjectDto> {
    // TODO: implement
    throw new NotImplementedException();
  }

  async getMany(filter: ProjectsFilter): Promise<ProjectDto[]> {
    // TODO: implement
    throw new NotImplementedException();
  }

  async deleteOne(projectId: string): Promise<ProjectDto> {
    // TODO: implement
    throw new NotImplementedException();
  }

  async getOne(projectId: string): Promise<ProjectDto> {
    // TODO: implement
    throw new NotImplementedException();
  }

  async updateOne(
    filter: ProjectsFilter,
    updates: UpdateProjectDto,
  ): Promise<ProjectDto> {
    // TODO: implement
    throw new NotImplementedException();
  }
}
