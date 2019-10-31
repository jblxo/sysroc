import { Module, HttpModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersResolver } from './users.resolver';
import { User } from './models/users.model';
import { Group } from '../groups/models/groups.model';
import { ConfigModule } from '../config/config.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: User, schemaOptions: {} },
      { typegooseClass: Group, schemaOptions: {} },
    ]),
    HttpModule,
    ConfigModule,
    GroupsModule,
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
