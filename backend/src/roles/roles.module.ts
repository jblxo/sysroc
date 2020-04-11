import { Module } from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { Role } from './entities/roles.entity';
import { PERMISSIONS } from '../permissions/permissions';
import { PermissionsModule } from '../permissions/permissions.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Role]), PermissionsModule],
    providers: [RolesResolver, RolesService],
    exports: [RolesService],
})
export class RolesModule {
    constructor(private readonly rolesService: RolesService) {}

    async onModuleInit(): Promise<void> {
        await this._seedRoles();
    }

    async _seedRoles(): Promise<void> {
        await this.rolesService.createOrUpdate({
            name: 'Super Administrator',
            slug: 'admin',
            admin: true,
            permissionSlugs: [],
        });
        await this.rolesService.createOrUpdate({
            name: 'Teacher',
            slug: 'teacher',
            admin: false,
            permissionSlugs: [
                PERMISSIONS.PROJECTS_MANAGE,
                PERMISSIONS.PROJECTS_CREATE,
                PERMISSIONS.PROJECTS_VIEW,
                PERMISSIONS.MANAGE_STUDENT_USERS,
                PERMISSIONS.DELETE_USERS,
                PERMISSIONS.CLASSIFICATION_CREATE,
                PERMISSIONS.CLASSIFICATION_MANAGE,
                PERMISSIONS.CLASSIFICATION_VIEW
            ],
        });
        await this.rolesService.createOrUpdate({
            name: 'Student',
            slug: 'student',
            admin: false,
            permissionSlugs: [
                PERMISSIONS.PROJECTS_CREATE,
                PERMISSIONS.PROJECTS_VIEW
            ],
        });
        await this.rolesService.createOrUpdate({
            name: 'Guest',
            slug: 'guest',
            admin: false,
            permissionSlugs: [
                PERMISSIONS.PROJECTS_VIEW,
            ],
        });
    }
}
