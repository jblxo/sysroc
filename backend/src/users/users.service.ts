import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersFilter } from './filters/users.filter';
import { User } from './models/users.model';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { UserDto } from './dto/user.dto';
import { ConfigService } from '../config/config.service';
import { ADResponse } from '../active-directory/models/ad-response.model';
import { Group } from '../groups/models/groups.model';
import { GroupsService } from '../groups/groups.service';
import { UserAuthInputDto } from './dto/user-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/models/roles.model';
import { PermissionStateDto } from './dto/permission-state.dto';
import { PERMISSIONS } from '../permissions/permissions';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  private readonly ADEndpoint: string;

  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Group)
    private readonly groupModel: ReturnModelType<typeof Group>,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly groupsService: GroupsService,
    private readonly rolesService: RolesService,
  ) {
    this.ADEndpoint = config.get('AD_ENDPOINT');
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userModel.find().exec();
  }

  async findOne(filter: UsersFilter): Promise<UserDto | undefined> {
    const user = await this.userModel
      .findOne(filter)
      .populate('groups')
      .populate('roles')
      .exec();

    if (!user) {
      throw new Error(`User not found!`);
    }

    await this.userModel.populate(user, {
      path: 'groups.users',
    });

    return user;
  }

  getADUser(
    authInputDto: UserAuthInputDto,
  ): Observable<AxiosResponse<ADResponse>> {
    const { email: username, password } = authInputDto;

    return this.httpService.post(`${this.ADEndpoint}/auth/login`, {
      username,
      password,
    });
  }

  async register(registerUserDto: RegisterUserDto): Promise<User & mongoose.Document> {
    const groups: Group[] = registerUserDto.dn
      .split(',')
      .map(val => ({ name: val.substring(val.indexOf('=') + 1) }));

    const createdGroups = await this.groupsService.createMany(groups);

    const createUser = {
      email: registerUserDto.email,
      adEmail: registerUserDto.adEmail,
      password: registerUserDto.password,
      name: registerUserDto.name,
      groups: [],
      roles: [],
    };

    createdGroups.forEach(group => {
      createUser.groups.push(group._id);
    });

    const guestRole = await this.rolesService.findOneBySlug('guest');
    createUser.roles.push(guestRole._id);

    const createdUser = new this.userModel(createUser);
    const newUser = await createdUser.save();

    for (const group of createdGroups) {
      group.users.push(newUser._id);
      await group.save();
    }

    guestRole.users.push(newUser._id);
    await guestRole.save();

    return await newUser
      .populate('groups')
      .populate('roles')
      .execPopulate();
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User & mongoose.Document> {
    // Unencrypted password that can be sent to the user via a mail, for example
    const passwordRaw = createUserDto.password ? createUserDto.password : crypto.randomBytes(16).toString('hex');
    const password = await this.hashPassword(passwordRaw);

    if (createUserDto.adEmail && createUserDto.password) {
      let response: ADResponse = null;
      await this.getADUser({
        email: createUserDto.adEmail,
        password: passwordRaw,
      }).subscribe(res => (response = res.data));

      if (!response) {
        throw new NotFoundException('Incorrect Active Directory email address or password.');
      }

      return await this.register({
        name: response.user.cn,
        email: createUserDto.email,
        adEmail: createUserDto.adEmail,
        password,
        dn: response.user.dn,
      });
    }

    const createUser = {
      email: createUserDto.email,
      adEmail: createUserDto.adEmail ? createUserDto.adEmail : createUserDto.email,
      password,
      name: createUserDto.name,
      roles: [],
    };

    const createdUser = new this.userModel(createUser);
    const newUser = await createdUser.save();

    for (const roleSlug of createUserDto.roleSlugs) {
      const role = await this.rolesService.findOneBySlug(roleSlug);
      role.users.push(newUser._id);
      newUser.roles.push(role._id);
      await role.save();
    }
    await newUser.save();

    return await newUser
      .populate('groups')
      .populate('roles')
      .execPopulate();
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async hasPermissions(
    userDto: UserDto,
    ...permissionSlugs: string[]
  ): Promise<boolean> {
    if (userDto.roles.length === 0) {
      return false;
    }

    let roles = userDto.roles;
    if (typeof roles[0] === 'string') {
      const user = await this.findOne({ _id: userDto._id });
      roles = user.roles;
    }

    for (const role of roles) {
      if (
        await this.rolesService.hasPermissions(role as Role, ...permissionSlugs)
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Run check on all permissions for the user.
   *
   * @param userDto
   */
  async getPermissionStates(userDto: UserDto): Promise<PermissionStateDto[]> {
    const permissions = [];
    for (const permission in PERMISSIONS) {
      if (PERMISSIONS.hasOwnProperty(permission)) {
        permissions.push({
          slug: PERMISSIONS[permission],
          permitted: await this.hasPermissions(
            userDto,
            PERMISSIONS[permission],
          ),
        });
      }
    }
    return permissions;
  }

  async delete(userId: string): Promise<boolean> {
    await this.groupModel
      .updateMany(
        { users: userId },
        { $pull: { users: userId } },
        (err, raw) => {
          if (err) {
            throw new Error(err);
          }
        },
      )
      .exec();
    return !!this.userModel.deleteOne({ _id: userId }).exec();
  }
}
