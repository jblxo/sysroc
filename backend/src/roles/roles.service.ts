import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Role } from './models/roles.model';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionsService } from '../permissions/permissions.service';
import { Permission } from '../permissions/models/permissions.model';
import { RolesFilter } from './filters/role.filter';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: ReturnModelType<typeof Role>,
    private readonly permissionsService: PermissionsService,
  ) {}

  async findOne(
    rolesFilter: RolesFilter,
  ): Promise<Role & mongoose.Document | undefined> {
    console.log(rolesFilter);

    const role = await this.roleModel
      .findOne(rolesFilter)
      .populate('permissions')
      .exec();

    if (!role) {
      throw new Error(`Role not found!`);
    }

    return role;
  }

  async findOneBySlug(
    slug: string,
  ): Promise<Role & mongoose.Document | undefined> {
    return await this.findOne({ slug });
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel({
      name: createRoleDto.name,
      slug: createRoleDto.slug,
      admin: createRoleDto.admin,
      permissions: [],
    });
    const newRole = await createdRole.save();

    return await this.updatePermissions(newRole, createRoleDto.permissionSlugs);
  }

  async createOrUpdate(createRoleDto: CreateRoleDto): Promise<Role> {
    const filter = { slug: createRoleDto.slug };
    const foundRole = await this.roleModel.findOne(filter);
    if (!foundRole) {
      return await this.create(createRoleDto);
    }

    await foundRole.updateOne({
      name: createRoleDto.name,
      admin: createRoleDto.admin,
    });

    return await this.updatePermissions(
      foundRole,
      createRoleDto.permissionSlugs,
    );
  }

  async updatePermissions(
    role: Role & mongoose.Document,
    permissions: string[],
  ): Promise<Role> {
    const permissionSlugs = permissions.map(permission => ({
      slug: permission,
    }));
    const createdPermissions = await this.permissionsService.createMany(
      permissionSlugs,
    );

    role = await role.populate('permissions').execPopulate();
    for (const permission of createdPermissions) {
      if (!(await this.hasPermissions(role, permission.slug))) {
        permission.roles.push(role._id);
        role.permissions.push(permission._id);
        await permission.save();
      }
    }
    await role.save();

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

    if (typeof role.permissions[0] === 'string') {
      role = await this.roleModel
        .findOne()
        .populate('permissions')
        .exec();
    }

    for (const permissionSlug of permissionSlugs) {
      if (
        role.permissions.filter(
          (rolePermission: Permission) =>
            rolePermission.slug === permissionSlug,
        ).length !== 0
      ) {
        return true;
      }
    }
    return false;
  }
}
