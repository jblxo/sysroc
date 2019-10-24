import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersResolver } from './users.resolver';
import { User } from './users.model';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
