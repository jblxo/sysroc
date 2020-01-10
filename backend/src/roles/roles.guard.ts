import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let user = request && request.hasOwnProperty('user') ? request.user : null;
    if (!user) {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      user = req.user;
    }

    if (!await this.usersService.hasPermissions(user, ...permissions)) {
      throw new AuthenticationError('Missing permissions.');
    }
    return true;
  }
}
