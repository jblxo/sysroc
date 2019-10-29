import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersResolver } from './users.resolver';
import { User } from './users.model';
import { Group } from '../groups/groups.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: User, schemaOptions: {} },
      { typegooseClass: Group, schemaOptions: {} },
    ]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
