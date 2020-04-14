import {
  ConflictException,
  HttpService,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersFilter } from './filters/users.filter';
import { User } from './entities/users.entity';
import { UserDto } from './dto/user.dto';
import { ConfigService } from '../config/config.service';
import { ADResponse } from '../active-directory/models/ad-response.model';
import { RegisterUserDto } from './dto/register-user.dto';
import { RolesService } from '../roles/roles.service';
import { PermissionStateDto } from './dto/permission-state.dto';
import { PERMISSIONS } from '../permissions/permissions';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuthInputDto } from './dto/user-auth-input.dto';
import { Role } from '../roles/entities/roles.entity';
import { GroupsService } from '../groups/groups.service';
import { CreateGroupDto } from '../groups/dto/create-group.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllUsersFilter } from './filters/all-users.filter';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  private readonly ADEndpoint: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly groupsService: GroupsService,
  ) {
    this.ADEndpoint = config.get('AD_ENDPOINT');
  }

  async findAll(filter: AllUsersFilter): Promise<UserDto[]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.groups', 'groups');

    const whereLike = (key: string) => {
      if (filter[key]) {
        return query.where(`LOWER(user.${key}) LIKE :${key}`, { [key]: `%${filter[key].toLowerCase()}%` });
      }
      return query;
    };

    whereLike('name');
    whereLike('email');
    whereLike('adEmail');

    let users = await query.getMany();

    if (filter.roles && filter.roles.length > 0) {
      users = users.filter(user => user.roles.some(role => filter.roles.includes(role.id)));
    }
    if (filter.groups && filter.groups.length > 0) {
      users = users.filter(user => user.groups.some(group => filter.groups.includes(group.id)));
    }

    return users;
  }

  async findOne(filter: UsersFilter): Promise<UserDto> {
    // Fix issues with null prototype objects which do not work as filters
    filter = JSON.parse(JSON.stringify(filter));

    const user = await this.userRepository
      .findOne(filter, { relations: ['roles', 'groups', 'projects'] });

    if (!user) {
      throw new Error(`User not found!`);
    }

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

  async register(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const groups: CreateGroupDto[] = registerUserDto.dn
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
      createUser.groups.push(group.id);
    });

    let guestRole = null;
    if (!registerUserDto.roleSlugs || registerUserDto.roleSlugs.length === 0) {
      guestRole = await this.rolesService.findOneBySlug('guest');
      createUser.roles.push(guestRole.id);
    }

    let newUser: User = null;
    try {
      newUser = await this.userRepository.save(this.userRepository.create(createUser));
    } catch {
      throw new Error('Email already in use.');
    }

    for (const group of createdGroups) {
      newUser.groups.push(group);
    }

    if (guestRole) {
      newUser.roles.push(guestRole);
    } else {
      await this.addRoles(newUser, registerUserDto.roleSlugs);
    }

    await this.userRepository.save(newUser);

    return await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(newUser.id)
      .leftJoinAndSelect('user.roles', 'roles')
      .getOne();
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    if (createUserDto.adEmail && createUserDto.password) {
      let response: ADResponse = null;
      try {
        response = await this.getADUser({
          email: createUserDto.adEmail,
          password: createUserDto.password,
        });
      } catch {
        // Nothing has to be done here
      }

      if (!response || !response.exists) {
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

    let createdUser: User = null;
    try {
      createdUser = await this.userRepository.save(this.userRepository.create(createUser));
    } catch {
      throw new Error('Email already in use.');
    }

    await this.addRoles(createdUser, createUserDto.roleSlugs);
    await this.userRepository.save(createdUser);

    return await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(createdUser.id)
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.groups', 'groups')
      .getOne();
  }

  async update(
    user: UserDto,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    await this.userRepository.update(user.id, {
      name: updateUserDto.name,
      email: updateUserDto.email,
    });

    const updatedUser = await this.userRepository.findOne({ id: user.id }, { relations: ['roles', 'groups'] });

    // Remove all roles
    updatedUser.roles.length = 0;
    // Remove all groups
    updatedUser.groups.length = 0;

    await this.addRoles(updatedUser, updateUserDto.roleSlugs);
    await this.addGroups(updatedUser, updateUserDto.groups);
    await this.userRepository.save(updatedUser);

    return await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(updatedUser.id)
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.groups', 'groups')
      .getOne();
  }

  async updateProfile(
    user: UserDto,
    updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    const updateUser: any = { name: updateProfileDto.name };

    if (updateProfileDto.email) {
      updateUser.email = updateProfileDto.email;
    }

    if (updateProfileDto.oldPassword && updateProfileDto.password && updateProfileDto.passwordAgain) {
      const valid = await bcrypt.compare(updateProfileDto.oldPassword, user.password);
      if (!valid) {
        throw new UnauthorizedException('The current password does not match.');
      }
      if (updateProfileDto.password !== updateProfileDto.passwordAgain) {
        throw new Error('The new password has not been confirmed.');
      }

      updateUser.password = await this.hashPassword(updateProfileDto.password);
    }

    try {
      await this.userRepository.update(user.id, updateUser);
    } catch {
      throw new ConflictException('This email is already in use!');
    }
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
      const user = await this.findOne({ id: userDto.id });
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

  async delete(user: UserDto): Promise<UserDto> {
    const result = await this.userRepository.delete({ id: user.id });

    if (result.affected < 1) {
      throw new InternalServerErrorException('There has been an error while deleting the user.');
    }

    return user;
  }

  /**
   * Assign new roles to the user.
   *
   * The user entity is **NOT** saved afterwards.
   *
   * @param user
   * @param roleSlugs
   */
  async addRoles(user: User, roleSlugs: string[]): Promise<void> {
    for (const roleSlug of roleSlugs) {
      if (!roleSlug) {
        continue;
      }

      const role = await this.rolesService.findOneBySlug(roleSlug);
      user.roles.push(role);
    }
  }

  /**
   * Assign new groups to the user.
   *
   * The user entity is **NOT** saved afterwards.
   *
   * @param user
   * @param groups
   */
  async addGroups(user: User, groups: number[]): Promise<void> {
    for (const groupId of groups) {
      const group = await this.groupsService.findOne({ id: groupId });
      user.groups.push(group);
    }
  }
}
