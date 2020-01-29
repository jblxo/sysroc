import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ProjectsModule,
  ],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
