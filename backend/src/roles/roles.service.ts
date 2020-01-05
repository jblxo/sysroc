import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Role } from './models/roles.model';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionsService } from '../permissions/permissions.service';
import { Permission } from '../permissions/models/permissions.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: ReturnModelType<typeof Role>,
    private readonly permissionsService: PermissionsService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel({
      name: createRoleDto.name,
      admin: createRoleDto.admin,
      permissions: [],
    });
    const newRole = await createdRole.save();

    return await this.updatePermissions(newRole, createRoleDto.permissionSlugs);
  }

  async createOrUpdate(createRoleDto: CreateRoleDto): Promise<Role> {
    const filter = { name: createRoleDto.name };
    const foundRole = await this.roleModel.findOne(filter);
    if (!foundRole) {
      return await this.create(createRoleDto);
    }

    await foundRole.updateOne({
      admin: createRoleDto.admin,
    });

    return await this.updatePermissions(foundRole, createRoleDto.permissionSlugs);
  }

  async updatePermissions(role: Role & mongoose.Document, permissions: string[]): Promise<Role> {
    const permissionSlugs = permissions.map(permission => ({ slug: permission }));
    const createdPermissions = await this.permissionsService.createMany(permissionSlugs);

    role = await role.populate('permissions').execPopulate();
    for (const permission of createdPermissions) {
      if (!await this.hasPermissions(role, permission.slug)) {
        permission.roles.push(role._id);
        role.permissions.push(permission._id);
        await permission.save();
      }
    }
    await role.save();

    return role;
  }

  async hasPermissions(role: Role, ...permissionSlugs: string[]): Promise<boolean> {
    if (role.admin) {
      return true;
    }
    if (role.permissions.length === 0) {
      return false;
    }

    if (typeof role.permissions[0] === 'string') {
      role = await this.roleModel.findOne().populate('permissions').exec();
    }

    for (const permissionSlug of permissionSlugs) {
      if (role.permissions.filter((rolePermission: Permission) => rolePermission.slug === permissionSlug).length !== 0) {
        return true;
      }
    }
    return false;
  }
}
