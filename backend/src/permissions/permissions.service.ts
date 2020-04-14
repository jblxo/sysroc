import { Injectable } from '@nestjs/common';
import { Permission } from './entities/permissions.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createMany(permissions: CreatePermissionDto[]): Promise<Permission[]> {
    return Promise.all(
      permissions.map(async (permission: CreatePermissionDto) => {
        const filter = { slug: permission.slug };
        const foundPermission = await this.permissionRepository.findOne(filter);
        if (!foundPermission) {
          let alternativeName = permission.slug.split('.').reverse().join(' ');
          alternativeName = alternativeName.charAt(0).toUpperCase() + alternativeName.substr(1);
          return this.permissionRepository.create({
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
