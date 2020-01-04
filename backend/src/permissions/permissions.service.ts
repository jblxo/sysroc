import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Permission } from './models/permissions.model';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private readonly permissionModel: ReturnModelType<typeof Permission>,
  ) {}

  async createMany(permissions: CreatePermissionDto[]): Promise<DocumentType<Permission>[]> {
    return Promise.all(
      permissions.map(async (permission: CreatePermissionDto) => {
        const filter = { slug: permission.slug };
        const foundPermission = await this.permissionModel.findOne(filter);
        if (!foundPermission) {
          // If the name is not forwarded, create an alternative name from the permission slug
          let alternativeName = permission.slug.split('.').reverse().join(' ');
          alternativeName = alternativeName.charAt(0).toUpperCase() + alternativeName.substr(1);
          return await this.permissionModel.create({
            name: permission.name ? permission.name : alternativeName,
            slug: permission.slug,
            roles: [],
          });
        }
        return foundPermission;
      }),
    );
  }
}
