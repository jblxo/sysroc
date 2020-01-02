import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Project } from './models/projects.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { ProjectsFilter } from './filters/project.filter';
import { ProjectDto } from './dto/project.dto';

@Resolver('Projects')
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  @UseGuards(GqlAuthGuard)
  createProject(
    @CurrentUser() user: UserDto,
    @Args('input') input: CreateProjectDto,
  ): Promise<Project> {
    return this.projectsService.create(input, user);
  }

  @Query(() => [ProjectDto])
  projects(@Args() filter: ProjectsFilter) {
    return this.projectsService.getMany(filter);
  }
}