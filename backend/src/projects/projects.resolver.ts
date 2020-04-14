import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProjectsFilter } from './filters/project.filter';
import { ProjectDto } from './dto/project.dto';
import { HasPermissions } from '../users/decorators/has-permissions.decorator';
import { PERMISSIONS } from '../permissions/permissions';
import { UpdateProjectDto } from './dto/update-project.dto';
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
  @HasPermissions(
    PERMISSIONS.PROJECTS_VIEW,
    PERMISSIONS.PROJECTS_CREATE,
    PERMISSIONS.PROJECTS_MANAGE,
  )
  projects(
    @CurrentUser() user: UserDto,
    @Args('filter') filter: ProjectsFilter,
  ) {
    return this.projectsService.getMany(filter);
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_CREATE)
  async deleteProject(
    @CurrentUser() user: UserDto,
    @Args('projectId') projectId: number,
  ) {
    return this.projectsService.deleteOne(projectId, user);
  }

  @Query(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(
    PERMISSIONS.PROJECTS_VIEW,
    PERMISSIONS.PROJECTS_CREATE
  )
  async project(
    @CurrentUser() user: UserDto,
    @Args('filter') filter: ProjectsFilter,
  ) {
    const project = await this.projectsService.getOne(filter.id);

    if (!await this.usersService.hasPermissions(user, PERMISSIONS.PROJECTS_VIEW) && user.id !== project.user.id) {
      throw new UnauthorizedException('You cannot view this project.');
    }

    return project;
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_VIEW)
  updateProject(
    @CurrentUser() user: UserDto,
    @Args('filter') filter: ProjectsFilter,
    @Args('updates') updates: UpdateProjectDto,
  ) {
    return this.projectsService.updateOne(filter, updates, user);
  }

  @Mutation(() => ProjectDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.PROJECTS_CLAIM)
  claimProject(
    @CurrentUser() user: UserDto,
    @Args('filter') filter: ProjectsFilter,
  ) {
    return this.projectsService.claim(filter, user);
  }
}
