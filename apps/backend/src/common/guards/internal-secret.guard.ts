import { timingSafeEqual } from 'node:crypto';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import { SafeConfigService } from '../config/safe-config.service';
import { SKIP_INTERNAL_SECRET_KEY } from './skip-internal-secret.decorator';

@Injectable()
export class InternalSecretGuard implements CanActivate {
  constructor(
    private readonly config: SafeConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_INTERNAL_SECRET_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skip) {
      return true;
    }

    // 検証用
    if (this.config.isInternalSecretDisabled) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers['x-internal-secret'];
    const expected = this.config.appConfig.internalSecret;

    if (typeof header !== 'string') {
      throw new UnauthorizedException();
    }

    const headerBuf = Buffer.from(header, 'utf-8');
    const expectedBuf = Buffer.from(expected, 'utf-8');

    // 長さが異なる場合は即拒否（timingSafeEqual は同一長のみ受け付けるため）
    if (headerBuf.length !== expectedBuf.length) {
      throw new UnauthorizedException();
    }

    if (!timingSafeEqual(headerBuf, expectedBuf)) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
