import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersFilter } from './filters/users.filter';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import {
  ConflictException,
  HttpService,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserAuthDto, UserAuthInputDto } from './dto/user-auth.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcryptjs';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { MyContext } from '../context';
import { jwtConstants } from '../auth/constants';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import * as crypto from 'crypto';
import { ConfigService } from '../config/config.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ObjectId } from 'bson';

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
    this.redisClient = redisService.getClient('sysroc.redis.users');
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async user(@Args() filter: UsersFilter) {
    return this.usersService.findOne(filter);
  }

  @Query(() => [UserDto])
  // @UseGuards(GqlAuthGuard)
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
    const cookies = req.cookies;
    if (!cookies['register-token']) {
      throw new UnauthorizedException('No or expired token for registration.');
    }

    const registerToken = cookies['register-token'];
    const registerUserDto: RegisterUserDto = JSON.parse(
      await this.redisClient.get(registerToken),
    );
    if (registerUserDto === undefined) {
      throw new UnauthorizedException('No or expired token for registration.');
    }

    let name = registerUserDto.name;
    let email = registerUserDto.adEmail;
    let password = registerUserDto.password;
    if (input.name !== '') {
      name = input.name;
    }
    if (input.email !== '') {
      email = input.email;
    }
    if (input.password !== '') {
      password = await this.usersService.hashPassword(input.password);
    }

    const user = await this.usersService.register({
      email,
      adEmail: registerUserDto.adEmail,
      name,
      password,
      dn: registerUserDto.dn,
    });

    // We need to get the registered user again due to the ID
    const registeredUser = await this.usersService.findOne({
      adEmail: user.adEmail,
    });

    const token = await this.authService.createToken(
      registeredUser.email,
      registeredUser._id,
    );

    await this.redisClient.del(registerToken);

    const refreshToken = await this.authService.createRefreshToken(
      registeredUser.email,
      registeredUser._id,
    );

    res.cookie('token', refreshToken, {
      httpOnly: true,
      path: jwtConstants.refreshPath,
    });

    return {
      accessToken: token,
      user,
      userTemp: null,
      registerToken: null,
    };
  }

  @Mutation(() => UserAuthDto)
  async signin(
    @Args('auth') auth: UserAuthInputDto,
    @Context() { res }: MyContext,
  ): Promise<UserAuthDto> {
    const user = await this.usersService
      .findOne({ email: auth.email })
      .catch(() => {
        // TODO: remove
        console.log('User not found.');
      });

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
        userTemp: null,
        registerToken: null,
      };
    }

    const userWithADEmail = await this.usersService
      .findOne({ adEmail: auth.email })
      .catch(() => {
        console.log(
          'User with the forwarded email from Active Directory not found.',
        );
      });
    if (userWithADEmail) {
      throw new ConflictException(
        'This email has already been registered. Have you forgotten your customized email?',
      );
    }

    const response = await this.usersService.getADUser(auth).toPromise();
    if (!response) {
      throw new UnauthorizedException('Wrong password or email!');
    }

    const password = await this.usersService.hashPassword(auth.password);
    const registerToken = crypto.randomBytes(32).toString('hex');

    res.cookie('register-token', registerToken, {
      httpOnly: true,
      path: '/',
      maxAge: 5 * 60 * 1000,
    });

    const registerUserDto: RegisterUserDto = {
      email: auth.email,
      adEmail: auth.email,
      name: response.data.user.cn,
      password,
      dn: response.data.user.dn,
    };

    await this.redisClient.append(
      registerToken,
      JSON.stringify(registerUserDto),
    );

    return {
      accessToken: null,
      user: null,
      userTemp: {
        email: auth.email,
        name: response.data.user.cn,
      },
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

  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.usersService.delete(userId);
  }
}
