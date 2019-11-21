import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto, SignUpUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersFilter } from './filters/users.filter';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { HttpService, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserAuthDto, UserAuthInputDto } from './dto/user-auth.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcryptjs';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { MyContext } from '../context';
import { jwtConstants } from '../auth/constants';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import * as crypto from 'crypto';
import { ConfigService } from '../config/config.service';

@Resolver()
export class UsersResolver {
  private ADEndpoint: string;
  private redisClient: Redis;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.ADEndpoint = config.get('AD_ENDPOINT');
    this.redisClient = redisService.getClient('redis');
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async user(@Args() filter: UsersFilter) {
    return this.usersService.findOne(filter);
  }

  @Query(() => [UserDto])
  @UseGuards(GqlAuthGuard)
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => UserDto, { nullable: true })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: UserDto) {
    return user;
  }

  // TODO: Only for GraphQL
  @Mutation(() => UserDto)
  async create(@Args('input') input: CreateUserDto) {
    return this.usersService.create(input);
  }

  @Mutation(() => UserAuthDto)
  async signup(
    @Args('input') input: SignUpUserDto,
    @Context() { res, req }: MyContext,
  ) {
    const registerToken = req.cookies;
    console.log(registerToken);

    const user = this.create({ email: input.name, password: input.password });
  }

  @Mutation(() => UserAuthDto)
  async signin(
    @Args('auth') auth: UserAuthInputDto,
    @Context() { res }: MyContext,
  ): Promise<UserAuthDto> {
    const user = await this.usersService
      .findOne({ email: auth.email })
      .catch(console.error);

    if (user) {
      const valid = await bcrypt.compare(auth.password, user.password);
      if (!valid) {
        throw new UnauthorizedException('Wrong password or email!');
      }

      const token = await this.authService.createToken(user.email, user._id);
      const refreshToken = await this.authService.createRefreshToken(
        user.email,
        user._id,
      );

      res.cookie('token', refreshToken, {
        httpOnly: true,
        path: jwtConstants.refreshPath,
      });

      return {
        accessToken: token,
        user,
        registerToken: null,
      };
    }

    const response = await this.usersService.getADUser(auth);
    if (!response) {
      throw new UnauthorizedException('Wrong password or email!');
    }

    const password = await bcrypt.hash(auth.password, 10);
    const registerToken = crypto.randomBytes(32).toString('hex');

    res.cookie('register-token', registerToken, {
      httpOnly: true,
      path: '/',
      maxAge: 5 * 60 * 1000,
    });
    await this.redisClient.append(registerToken, {
      email: auth.email,
      password,
    });

    return {
      accessToken: null,
      user: null,
      registerToken,
    };
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logout(@Context() { res }: MyContext): Promise<Boolean> {
    res.cookie('token', '', {
      httpOnly: true,
      path: jwtConstants.refreshPath,
    });

    return true;
  }

  // TODO: Only for GraphQL
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async delete(
    @Args('input') input: DeleteUserDto,
    @Context() { res }: MyContext,
  ): Promise<number> {
    return await this.usersService.delete(input);
  }
}
