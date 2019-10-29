import { Module } from '@nestjs/common';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Group } from './groups.model';
import { User } from '../users/users.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Group, schemaOptions: {} },
      { typegooseClass: User, schemaOptions: {} },
    ]),
  ],
  providers: [GroupsResolver, GroupsService],
})
export class GroupsModule {}
