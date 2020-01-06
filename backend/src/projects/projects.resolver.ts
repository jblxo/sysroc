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
import { User } from '../users/models/users.model';

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
  @UseGuards(GqlAuthGuard)
  projects(@CurrentUser() user: UserDto, @Args() filter?: ProjectsFilter) {
    const newFilter: ProjectsFilter = {
      user: user._id,
    };

    return this.projectsService.getMany(newFilter);
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
}
