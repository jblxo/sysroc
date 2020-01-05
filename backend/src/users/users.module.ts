import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersResolver } from './users.resolver';
import { User } from './models/users.model';
import { Group } from '../groups/models/groups.model';
import { ConfigModule } from '../config/config.module';
import { GroupsModule } from '../groups/groups.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: User, schemaOptions: {} },
      { typegooseClass: Group, schemaOptions: {} },
    ]),
    HttpModule,
    ConfigModule,
    GroupsModule,
    RolesModule,
    AuthModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
