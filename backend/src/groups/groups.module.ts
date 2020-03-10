import { Module } from '@nestjs/common';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/groups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupsResolver, GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
