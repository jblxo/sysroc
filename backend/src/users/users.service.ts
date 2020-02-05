import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.groups', 'groups')
      .getMany();
  }

  async findOne(filter: UsersFilter): Promise<UserDto> {
    const user = await this.userRepository
      .findOne(filter, { relations: ['roles', 'groups'] });

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
      await this.userRepository.save(newUser);
    } else {
      await this.addRoles(newUser, registerUserDto.roleSlugs);
    }

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

    return await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(createdUser.id)
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.groups', 'groups')
      .getOne();
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

  async delete(userId: number): Promise<boolean> {
    const deleted = await this.userRepository.delete({ id: userId });
    return deleted.affected > 0;
  }

  /**
   * Assign new roles to the user.
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
    await this.userRepository.save(user);
  }
}
