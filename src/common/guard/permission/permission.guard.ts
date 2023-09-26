import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PERMISSION_KEY } from 'src/common/decorators/permissions.decorator';
import { Permission } from 'src/common/constants/constants';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) {
      return true;
    }
    console.log('require permission:', requiredPermission);

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    console.log('user', user);

    let permissions = [];

    for (let role of user['roles']) {
      for (let permission of role['permissions']) {
        permissions.push(permission['permissionName']);
      }
    }
    console.log('abc', permissions);

    return permissions.includes(requiredPermission);
  }
}
