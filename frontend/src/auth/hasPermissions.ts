import { UserAuthDto } from '../generated/graphql';

/**
 * Check whether the user is permitted to do this action.
 *
 * The user must have at least one of the presented permissions.
 * Permissions are forwarded as a parameter each, not as a single list.
 *
 * @param userAuthDto
 * @param permissions
 */
export const hasPermissions = (userAuthDto: UserAuthDto, ...permissions: string[]): boolean => {
  if (userAuthDto && userAuthDto.permissions && userAuthDto.permissions.length !== 0) {
    for (const slug of permissions) {
      if (userAuthDto.permissions.some(permission => permission.slug === slug && permission.permitted)) {
        return true;
      }
    }
  }
  return false;
};
