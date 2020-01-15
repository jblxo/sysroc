import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Task } from './models/tasks.model';
import { ProjectsModule } from '../projects/projects.module';
import { Project } from '../projects/models/projects.model';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Task, schemaOptions: {} },
      { typegooseClass: Project, schemaOptions: {} },
    ]),
    ProjectsModule,
  ],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
