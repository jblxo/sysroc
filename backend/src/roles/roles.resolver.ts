import { Args, Query, Resolver } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { RoleDto } from './dto/role.dto';
import { RolesFilter } from './filters/role.filter';

@Resolver('Roles')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [RoleDto])
  @UseGuards(GqlAuthGuard)
  async roles(
    @Args('filter') filter: RolesFilter,
  ) {
    return await this.rolesService.findAll(filter);
  }
}
