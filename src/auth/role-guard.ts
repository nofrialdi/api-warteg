import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Allow access if no roles are specified
    }

    const { user } = context.switchToHttp().getRequest();

    //if (!user) {
      //throw new ForbiddenException('Invalid token.'); // User is not authenticated
    //}

    // Check if the user has the necessary role for the route
    const hasRequiredRole = requiredRoles.some((requiredRole) => user.role === requiredRole);

    if (!hasRequiredRole) {
      throw new ForbiddenException('You do not have permission to access this resource.'); // User does not have the required role
    }

    return true;
  }
}
