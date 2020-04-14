import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Project } from './entities/projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserDto } from '../users/dto/user.dto';
import { ProjectsFilter } from './filters/project.filter';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { PERMISSIONS } from '../permissions/permissions';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    user: UserDto,
  ): Promise<ProjectDto> {
    const project = this.projectRepository.create(createProjectDto);
    project.user = await this.userRepository.findOne({ id: user.id });
    const res = await this.projectRepository.save(project);
    return this.projectRepository.findOne(res.id, { relations: ['user', 'supervisor'] });
  }

  async getMany(filter: ProjectsFilter): Promise<ProjectDto[]> {
    const query = this.projectRepository.createQueryBuilder('project')
        .innerJoinAndSelect('project.user', 'user')
        .leftJoinAndSelect('project.supervisor', 'supervisor')
        .leftJoinAndSelect('project.tasks', 'tasks')
        .orderBy({ 'tasks.createdAt': 'ASC' });
      
    if (filter.user) {
      query.andWhere('project.user.id = :id', { id: filter.user });
    }
      
    if(filter.name && filter.name !== '') {
      query.andWhere('project.name like :name', {name: `%${filter.name}%`});
    }

    if(filter.authors && filter.authors.length > 0) {
      query.andWhere('user.id IN (:...userIds)', {userIds: filter.authors});
    }

    if(filter.supervisors && filter.supervisors.length > 0) {
      query.andWhere('supervisor.id IN (:...supervisorIds)', {supervisorIds: filter.supervisors});
    }

    return query.getMany();
  }

  async deleteOne(projectId: number): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne({ id: projectId }, { relations: ['user', 'supervisor'] });
    if (!project) {
      throw new NotFoundException(`Project couldn't be found.`);
    }

    const res = await this.projectRepository.delete({ id: projectId });
    if (res.affected < 1) {
      throw new InternalServerErrorException(`There has been an error during deleting the project.`);
    }

    return project;
  }

  async getOne(projectId: number): Promise<ProjectDto> {
    return this.projectRepository
      .createQueryBuilder('project')
      .where('project.id = :id', { id: projectId })
      .innerJoinAndSelect('project.user', 'user')
      .leftJoinAndSelect('project.supervisor', 'supervisor')
      .leftJoinAndSelect('project.tasks', 'tasks')
      .leftJoinAndSelect('project.classifications', 'classifications')
      .leftJoinAndSelect('classifications.user', 'teacher')
      .orderBy({ 'tasks.createdAt': 'ASC' })
      .getOne();
  }

  async updateOne(
    filter: ProjectsFilter,
    updates: UpdateProjectDto,
    user: UserDto,
  ): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne(filter.id, { relations: ['user', 'supervisor'] });

    if (!project) {
      throw new NotFoundException(`Could not find project!`);
    }

    if (project.user.id !== user.id && !await this.usersService.hasPermissions(user, PERMISSIONS.PROJECTS_MANAGE)) {
      throw new UnauthorizedException(`Missing permissions for updating this project`);
    }

    const updateProject: Project = {
      ...project,
      name: updates.name,
      description: updates.description,
    };

    if (await this.usersService.hasPermissions(user, PERMISSIONS.PROJECTS_CLAIM_MANAGE)) {
      updateProject.supervisor = updates.supervisor ? await this.userRepository.findOne({ id: updates.supervisor }) : null;
    }

    const res = await this.projectRepository.update(filter.id, updateProject);

    if (!res || res.affected < 1) {
      throw new InternalServerErrorException(`Could not update the project`);
    }

    return await this.projectRepository.findOne(filter.id, { relations: ['user', 'supervisor'] });
  }

  async claim(
    filter: ProjectsFilter,
    user: UserDto,
  ): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne(filter.id, { relations: ['user', 'supervisor'] });

    if (!project) {
      throw new NotFoundException(`Could not find project!`);
    }

    if (project.supervisor && project.supervisor.id !== user.id) {
      throw new UnauthorizedException(`You cannot claim this project.`);
    }

    project.supervisor = project.supervisor ? null : await this.userRepository.findOne({ id: user.id });
    const res = await this.projectRepository.update(filter.id, project);

    if (!res || res.affected < 1) {
      throw new InternalServerErrorException(`Could not claim the project.`);
    }

    return await this.projectRepository.findOne(filter.id, { relations: ['user', 'supervisor'] });
  }
}
