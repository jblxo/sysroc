import { Resolver, Query, Args } from '@nestjs/graphql';
import { ActiveDirectoryService } from './active-directory.service';
import { ADUser } from './models/ad-user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Resolver('ActiveDirectory')
export class ActiveDirectoryResolver {
  constructor(
    private readonly activeDirectoryService: ActiveDirectoryService,
  ) {}

  @Query(() => ADUser)
  async authUser(@Args('auth') auth: CreateUserDto) {
    return this.activeDirectoryService.authUser(auth);
  }
}
