import { Args, Query, Resolver } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import { RolesFilter } from './filters/role.filter';

@Resolver('Roles')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [RoleDto])
  async roles(
    @Args('filter') filter: RolesFilter,
  ) {
    return await this.rolesService.findAll(filter);
  }
}
