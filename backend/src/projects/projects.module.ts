import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
