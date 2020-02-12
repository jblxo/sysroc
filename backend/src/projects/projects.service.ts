import {Injectable, NotImplementedException} from '@nestjs/common';
import {Project} from './entities/projects.entity';
import {CreateProjectDto} from './dto/create-project.dto';
import {UserDto} from '../users/dto/user.dto';
import {ProjectsFilter} from './filters/project.filter';
import {ProjectDto} from './dto/project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../users/entities/users.entity';

@Injectable()
export class ProjectsService {
  constructor(
      @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    user: UserDto,
  ): Promise<ProjectDto> {
    const project = this.projectRepository.create(createProjectDto);
    project.user = await this.userRepository.findOne({id: user.id});
    return this.projectRepository.save(project);
  }

  async getMany(filter: ProjectsFilter): Promise<ProjectDto[]> {
    return this.projectRepository.find({...filter, relations: ['user']});
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
