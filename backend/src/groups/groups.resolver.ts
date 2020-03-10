import { Query, Resolver } from '@nestjs/graphql';
import { Group } from './entities/groups.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { GroupsService } from './groups.service';

@Resolver('Groups')
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(() => [Group])
  @UseGuards(GqlAuthGuard)
  async groups() {
    return await this.groupsService.findAll();
  }
}
