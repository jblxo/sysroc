import { Module } from '@nestjs/common';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UsersModule,
  ],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
