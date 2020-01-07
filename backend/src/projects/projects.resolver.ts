import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './models/projects.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { ProjectsFilter } from './filters/project.filter';
import { ProjectDto } from './dto/project.dto';
import { User } from '../users/models/users.model';
import { HasPermissions } from '../users/decorators/has-permissions.decorator';
import { PERMISSIONS } from '../permissions/permissions';
import { UsersService } from '../users/users.service';

@Resolver('Projects')
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_CREATE)
  createProject(
    @CurrentUser() user: UserDto,
    @Args('input') input: CreateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectsService.create(input, user);
  }

  @Query(() => [ProjectDto])
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_VIEW, PERMISSIONS.PROJECTS_CREATE, PERMISSIONS.PROJECTS_MANAGE)
  projects(@CurrentUser() user: UserDto, @Args() filter?: ProjectsFilter) {
    const newFilter: ProjectsFilter = {
      user: user._id,
    };

    return this.projectsService.getMany(newFilter);
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_CREATE)
  async deleteProject(
    @CurrentUser() user: UserDto,
    @Args('projectId') projectId: string,
  ) {
    const project = await this.projectsService.getOne(projectId);
    const author = project.user as User;
    const canManageProjects = await this.usersService.hasPermissions(author, PERMISSIONS.PROJECTS_MANAGE);

    if (author._id.toString() !== user._id.toString() && !canManageProjects) {
      throw new Error(`You can't delete projects which you don't own!`);
    }

    return this.projectsService.deleteOne(projectId);
  }

  @Query(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  async project(@CurrentUser() user: UserDto, @Args() filter: ProjectsFilter) {
    const project = await this.projectsService.getOne(filter._id && filter._id);
    const autor = project.user && (project.user as UserDto);
    if (autor._id.toString() !== user._id.toString()) {
      throw new Error(
        `You can not view projects that you don't have access to!`,
      );
    }
    return project;
  }
}
