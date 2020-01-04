import { Module } from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Role } from './models/roles.model';
import { PERMISSIONS } from '../permissions/permissions';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypegooseModule.forFeature([{ typegooseClass: Role, schemaOptions: {} }]),
    PermissionsModule,
  ],
  providers: [RolesResolver, RolesService],
})
export class RolesModule {
  constructor(private readonly rolesService: RolesService) {}

  async onModuleInit(): Promise<void> {
    await this.seedRoles();
  }

  async seedRoles(): Promise<void> {
    await this.rolesService.createOrUpdate({
      name: 'Super Administrator',
      admin: true,
      permissionSlugs: [],
    });
    await this.rolesService.createOrUpdate({
      name: 'Teacher',
      admin: false,
      permissionSlugs: [
        PERMISSIONS.PROJECTS_MANAGE,
        PERMISSIONS.PROJECTS_CREATE,
      ],
    });
    await this.rolesService.createOrUpdate({
      name: 'Student',
      admin: false,
      permissionSlugs: [
        PERMISSIONS.PROJECTS_CREATE,
      ],
    });
    await this.rolesService.createOrUpdate({
      name: 'Guest',
      admin: false,
      permissionSlugs: [],
    });
  }
}
