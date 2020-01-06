import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/graphql-auth.guard';
import { RolesGuard } from '../../roles/roles.guard';

/**
 * Check whether the user is permitted to do this action.
 *
 * The user must have at least one of the presented permissions.
 * Permissions are forwarded as a parameter each, not as a single list.
 *
 * @param permissions
 */
export function HasPermissions(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(GqlAuthGuard, RolesGuard),
  );
}
