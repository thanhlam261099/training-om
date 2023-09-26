import { PermissionGuard } from './../guard/permission/permission.guard';
import {
  applyDecorators,
  CustomDecorator,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

export const PERMISSION_KEY = 'hasPermission';
export const HasPermission = (permission: string): CustomDecorator<string> =>
  SetMetadata(PERMISSION_KEY, permission);

export function Permissions(permission: string) {
  return applyDecorators(HasPermission(permission), UseGuards(PermissionGuard));
}
