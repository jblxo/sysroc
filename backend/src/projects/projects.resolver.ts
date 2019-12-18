import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Project } from './models/projects.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Resolver('Projects')
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  create(@Args('input') input: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(input);
  }
}
