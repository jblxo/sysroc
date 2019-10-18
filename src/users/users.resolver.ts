import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersFilter } from './filters/users.filter';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserDto)
  async user(@Args() filter: UsersFilter) {
    return this.usersService.findOne(filter);
  }

  @Query(() => [UserDto])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(() => UserDto)
  async createUser(@Args('input') input: CreateUserDto) {
    return this.usersService.create(input);
  }
}
