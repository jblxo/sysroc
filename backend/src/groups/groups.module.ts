import { Module } from '@nestjs/common';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Group } from './models/groups.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{ typegooseClass: Group, schemaOptions: {} }]),
  ],
  providers: [GroupsResolver, GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
