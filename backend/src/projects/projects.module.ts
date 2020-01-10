import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Project } from './models/projects.model';
import { User } from '../users/models/users.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Project, schemaOptions: {} },
      { typegooseClass: User, schemaOptions: {} },
    ]),
  ],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
