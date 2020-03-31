import { Module } from '@nestjs/common';
import { ClassificationResolver } from './classification.resolver';
import { ClassificationService } from './classification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Classification} from './entities/classification.entity';
import {User} from '../users/entities/users.entity';
import {Project} from '../projects/entities/projects.entity';
import {ProjectsModule} from '../projects/projects.module';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Classification, User, Project]),
      ProjectsModule,
      UsersModule
  ],
  providers: [ClassificationResolver, ClassificationService]
})
export class ClassificationModule {
}
