import {Injectable, InternalServerErrorException, NotFoundException, NotImplementedException} from '@nestjs/common';
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

  async deleteOne(projectId: number): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne({id: projectId});
    if (!project) {
      throw new NotFoundException(`Project couldn't be found.`);
    }

    const res = await this.projectRepository.delete({id: projectId});
    if(res.affected < 1) {
      throw new InternalServerErrorException(`There has been an error during deleting the project.`);
    }

    return project;
  }

  async getOne(projectId: number): Promise<ProjectDto> {
    return this.projectRepository.findOne(projectId, {relations: ['tasks']});
  }

  async updateOne(
    filter: ProjectsFilter,
    updates: UpdateProjectDto,
  ): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne(filter.id, {relations: ['user']});

    if(!project) {
      throw new NotFoundException(`Could not find project!`);
    }

    const updateProject: Project = {...project, ...updates};
    const res = await this.projectRepository.update(filter.id, updateProject);

    if(!res || res.affected < 1) {
      throw new InternalServerErrorException(`Could not update the project`);
    }

    return await this.projectRepository.findOne(filter.id, {relations: ['user']});
  }
}
