import { ConflictException, HttpService, Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.userModel
      .find()
      .populate('groups')
      .populate('roles')
      .exec();
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

  async getADUser(
    authInputDto: UserAuthInputDto,
  ): Promise<ADResponse> {
    const { email: username, password } = authInputDto;

    let response: ADResponse = null;
    await this.httpService
      .post(`${this.ADEndpoint}/auth/login`, {
        username,
        password,
      })
      .toPromise()
      .then(res => (response = res.data));

    return response;
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

    let guestRole = null;
    if (!registerUserDto.roleSlugs || registerUserDto.roleSlugs.length === 0) {
      guestRole = await this.rolesService.findOneBySlug('guest');
      createUser.roles.push(guestRole._id);
    }

    const createdUser = new this.userModel(createUser);
    const newUser = await createdUser.save().catch(() => {
      throw new ConflictException('This email has already been registered.');
    });

    for (const group of createdGroups) {
      group.users.push(newUser._id);
      await group.save();
    }

    if (guestRole) {
      guestRole.users.push(newUser._id);
      await guestRole.save();
    } else {
      await this.addRoles(newUser, registerUserDto.roleSlugs);
    }

    return await newUser
      .populate('groups')
      .populate('roles')
      .execPopulate();
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User & mongoose.Document> {
    if (createUserDto.adEmail && createUserDto.password) {
      const response = await this.getADUser({
        email: createUserDto.adEmail,
        password: createUserDto.password,
      });

      if (!response) {
        throw new NotFoundException('Incorrect Active Directory email address or password.');
      }

      const adPassword = await this.hashPassword(createUserDto.password);

      return await this.register({
        name: createUserDto.name,
        email: createUserDto.email,
        adEmail: createUserDto.adEmail,
        password: adPassword,
        dn: response.user.dn,
        roleSlugs: createUserDto.roleSlugs,
      });
    }

    // Unencrypted password that can be sent to the user via a mail, for example
    const passwordRaw = createUserDto.password ? createUserDto.password : crypto.randomBytes(16).toString('hex');
    const password = await this.hashPassword(passwordRaw);

    const createUser = {
      email: createUserDto.email,
      adEmail: createUserDto.adEmail ? createUserDto.adEmail : createUserDto.email,
      password,
      name: createUserDto.name,
      roles: [],
    };

    const createdUser = new this.userModel(createUser);
    const newUser = await createdUser.save();

    await this.addRoles(newUser, createUserDto.roleSlugs);

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
      if (await this.rolesService.hasPermissions(role as Role, ...permissionSlugs)) {
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

  /**
   * Assign new roles to the user.
   *
   * @param user
   * @param roleSlugs
   */
  async addRoles(user: User & mongoose.Document, roleSlugs: string[]): Promise<void> {
    for (const roleSlug of roleSlugs) {
      if (!roleSlug) {
        continue;
      }

      const role = await this.rolesService.findOneBySlug(roleSlug);
      role.users.push(user._id);
      user.roles.push(role._id);
      await role.save();
    }
    await user.save();
  }
}
