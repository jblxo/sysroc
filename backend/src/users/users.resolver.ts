import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersFilter } from './filters/users.filter';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import {
  ConflictException,
  HttpService, NotImplementedException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
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
import { redisConstants } from '../redis/constants';
import { User } from './entities/users.entity';
import { HasPermissions } from './decorators/has-permissions.decorator';
import { PERMISSIONS } from '../permissions/permissions';
import { RolesService } from '../roles/roles.service';
import { UserAuthInputDto } from './dto/user-auth-input.dto';

@Resolver()
export class UsersResolver {
  private ADEndpoint: string;
  private redisClient: Redis;

  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.ADEndpoint = config.get('AD_ENDPOINT');
    this.redisClient = redisService.getClient(redisConstants.name);
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async user(@Args() filter: UsersFilter) {
    return await this.usersService.findOne(filter);
  }

  @Query(() => [UserDto])
  @UseGuards(GqlAuthGuard)
  async users() {
    return await this.usersService.findAll();
  }

  @Query(() => UserAuthDto, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: UserDto) {
    const permissions = await this.usersService.getPermissionStates(user);

    return {
      user,
      permissions,
    };
  }

  @Query(() => UserAuthDto, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async meExtended(@CurrentUser() user: User) {
    // TODO: implements
    throw new NotImplementedException();
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  @HasPermissions(PERMISSIONS.MANAGE_STUDENT_USERS, PERMISSIONS.MANAGE_TEACHER_USERS)
  async createUser(
    @CurrentUser() user: User,
    @Args('input') input: CreateUserDto,
  ) {
    // TODO: implement
    throw new NotImplementedException();
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
    const permissions = await this.usersService.getPermissionStates(user);

    // We need to fetch the registered user again to get the ID
    const registeredUser = await this.usersService.findOne({
      adEmail: user.adEmail,
    });

    const token = await this.authService.createToken(
      registeredUser.email,
      registeredUser.id,
    );

    await this.redisClient.del(registerToken);

    const refreshToken = await this.authService.createRefreshToken(
      registeredUser.email,
      registeredUser.id,
    );

    res.cookie('token', refreshToken, {
      httpOnly: true,
      path: jwtConstants.refreshPath,
    });

    return {
      accessToken: token,
      user,
      permissions,
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
      .findOne({ email: auth.email });

    if (user) {
      const valid = await bcrypt.compare(auth.password, user.password);
      if (!valid) {
        throw new UnauthorizedException('Wrong password or email!');
      }

      const permissions = await this.usersService.getPermissionStates(user);

      const token = await this.authService.createToken(user.email, user.id);
      const refreshToken = await this.authService.createRefreshToken(
        user.email,
        user.id,
      );

      console.log(refreshToken);

      res.cookie('token', refreshToken, {
        httpOnly: true,
        path: jwtConstants.refreshPath,
      });

      return {
        accessToken: token,
        user,
        permissions,
        userTemp: null,
        registerToken: null,
      };
    }

    const userWithADEmail = await this.usersService
      .findOne({ adEmail: auth.email });
    if (userWithADEmail) {
      throw new ConflictException(
        'This email has already been registered. Have you forgotten your customized email?',
      );
    }

    const response = await this.usersService.getADUser(auth);
    if (!response.exists) {
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
      name: response.user.cn,
      password,
      dn: response.user.dn,
    };

    await this.redisClient.append(
      registerToken,
      JSON.stringify(registerUserDto),
    );

    return {
      accessToken: null,
      user: null,
      permissions: null,
      userTemp: {
        email: auth.email,
        name: response.user.cn,
      },
      registerToken,
    };
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logout(@Context() { res }: MyContext): Promise<boolean> {
    res.cookie('token', '', {
      httpOnly: true,
      path: jwtConstants.refreshPath,
    });

    return true;
  }

  // TODO: Add Guard
  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.usersService.delete(userId);
  }
}
