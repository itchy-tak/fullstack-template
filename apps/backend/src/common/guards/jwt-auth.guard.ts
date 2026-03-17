import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

import { SafeConfigService } from '../config/safe-config.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly config: SafeConfigService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // 検証用
    if (this.config.isAuthDisabled) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const token = authHeader.slice(7);

    try {
      this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
