import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { ProjectsFilter } from './filters/project.filter';
import { ProjectDto } from './dto/project.dto';
import { User } from '../users/models/users.model';
import { UpdateProjectDto } from './dto/update-project.dto';

@Resolver('Projects')
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  createProject(
    @CurrentUser() user: UserDto,
    @Args('input') input: CreateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectsService.create(input, user);
  }

  @Query(() => [ProjectDto])
  projects(
    @CurrentUser() user: UserDto,
    @Args('filter') filter: ProjectsFilter,
  ) {
    return this.projectsService.getMany(filter);
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  async deleteProject(
    @CurrentUser() user: UserDto,
    @Args('projectId') projectId: string,
  ) {
    const project = await this.projectsService.getOne(projectId);
    const autor = project.user as User;

    if (autor._id.toString() !== user._id.toString()) {
      throw new Error(`You can't delete projects which you don't own!`);
    }

    return this.projectsService.deleteOne(projectId);
  }

  @Query(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  async project(
    @CurrentUser() user: UserDto,
    @Args('filter') filter: ProjectsFilter,
  ) {
    const project = await this.projectsService.getOne(filter._id && filter._id);
    const autor = project.user && (project.user as UserDto);
    if (autor._id.toString() !== user._id.toString()) {
      throw new Error(
        `You can not view projects that you don't have access to!`,
      );
    }
    return project;
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  async updateProject(
    @CurrentUser() user: UserDto,
    @Args('filter') filter: ProjectsFilter,
    @Args('updates') updates: UpdateProjectDto,
  ) {
    const project = await this.projectsService.getOne(filter._id && filter._id);
    const autor = project.user && (project.user as UserDto);
    if (autor._id.toString() !== user._id.toString()) {
      throw new Error(
        `You can not view projects that you don't have access to!`,
      );
    }

    await this.projectsService.updateOne(filter, updates);
    return this.projectsService.getOne(filter._id);
  }
}
