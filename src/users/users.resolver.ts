import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersFilter } from './filters/users.filter';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserAuthDto, UserAuthInputDto } from './dto/user-auth.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcryptjs';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async user(@Args() filter: UsersFilter) {
    return this.usersService.findOne(filter);
  }

  @Query(() => [UserDto])
  @UseGuards(GqlAuthGuard)
  async users(@CurrentUser() user: UserDto) {
    return this.usersService.findAll();
  }

  @Mutation(() => UserDto)
  async signup(@Args('input') input: CreateUserDto) {
    return this.usersService.create(input);
  }

  @Mutation(() => UserAuthDto)
  async signin(@Args('auth') auth: UserAuthInputDto): Promise<UserAuthDto> {
    const user = await this.usersService.findOne({ email: auth.email });
    const valid = await bcrypt.compare(auth.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Wrong password or email!');
    }
    const token = await this.authService.createToken(user.email, user._id);
    return {
      email: user.email,
      access_token: token,
    };
  }
}
