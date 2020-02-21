import { Injectable } from '@nestjs/common';
import { Role } from './entities/roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionsService } from '../permissions/permissions.service';
import { Permission } from '../permissions/entities/permissions.entity';
import { RolesFilter } from './filters/role.filter';
import { RoleDto } from './dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly permissionsService: PermissionsService,
  ) {}

  async findOne(rolesFilter: RolesFilter): Promise<Role> {
    const role = await this.roleRepository
      .findOne({ relations: ['permissions', 'users'], where: rolesFilter });

    if (!role) {
      throw new Error(`Role not found!`);
    }

    return role;
  }

  async findOneBySlug(
    slug: string,
  ): Promise<Role> {
    return await this.findOne({ slug });
  }

  async findAll(rolesFilter: RolesFilter): Promise<RoleDto[]> {
    // As the filter is a null prototype and TypeORM has issues with such objects, we need to recreate the filter instance
    const filter = JSON.parse(JSON.stringify(rolesFilter));
    return await this.roleRepository.find({ relations: ['permissions'], where: filter });
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    role.name = createRoleDto.name;
    role.slug = createRoleDto.slug;
    role.admin = createRoleDto.admin;
    const newRole = await this.roleRepository.save(role);

    return await this.updatePermissions(newRole, createRoleDto.permissionSlugs);
  }

  async createOrUpdate(createRoleDto: CreateRoleDto): Promise<Role> {
    const filter = { slug: createRoleDto.slug };
    const foundRole = await this.roleRepository.findOne(filter);
    if (!foundRole) {
      return await this.create(createRoleDto);
    }

    await this.roleRepository.update(foundRole.id, {
      name: createRoleDto.name,
      admin: createRoleDto.admin,
    });

    return await this.updatePermissions(
      foundRole,
      createRoleDto.permissionSlugs,
    );
  }

  async updatePermissions(
    role: Role,
    permissions: string[],
  ): Promise<Role> {
    const permissionSlugs = permissions.map(permission => ({
      slug: permission,
    }));
    const createdPermissions = await this.permissionsService.createMany(
      permissionSlugs,
    );

    role = await this.roleRepository
      .createQueryBuilder('role')
      .whereInIds(role.id)
      .leftJoinAndSelect('role.permissions', 'permissions')
      .getOne();

    for (const permission of createdPermissions) {
      if (!(await this.hasPermissions(role, permission.slug))) {
        role.permissions.push(permission);
      }
    }

    await this.roleRepository.save(role);

    return role;
  }

  async hasPermissions(
    role: Role,
    ...permissionSlugs: string[]
  ): Promise<boolean> {
    if (role.admin) {
      return true;
    }
    if (!role.permissions || role.permissions.length === 0) {
      return false;
    }

    if (!role.permissions[0].hasOwnProperty('slug')) {
      role = await this.roleRepository
        .createQueryBuilder('role')
        .where({slug: role.slug})
        .leftJoinAndSelect('role.permissions', 'permissions')
        .getOne();
    }

    for (const permissionSlug of permissionSlugs) {
      if (role.permissions.some((rolePermission: Permission) => rolePermission.slug === permissionSlug)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check whether there is an admin role in the list of role slugs.
   *
   * @param slugs
   */
  async containsAdminRole(slugs: string[]): Promise<boolean> {
    for (const slug of slugs) {
      // Since the input can be given from the user, there may be empty values which should be skipped
      if (!slug) {
        continue;
      }

      try {
        if ((await this.findOneBySlug(slug)).admin) {
          return true;
        }
      } catch {
        // Nothing has to be done here as the role has not been found
      }
    }

    return false;
  }
}
