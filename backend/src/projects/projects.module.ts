import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import {User} from '../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User]),
    UsersModule,
  ],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
