import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { HealthResponseDto, ProtectedResponseDto } from './app.dto';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { SkipInternalSecret } from './common/guards/skip-internal-secret.decorator';

@Controller()
export class AppController {
  @Get('health')
  @SkipInternalSecret()
  @ApiOkResponse({ type: HealthResponseDto })
  getHealth(): HealthResponseDto {
    return { status: 'ok' };
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProtectedResponseDto })
  getProtected(): ProtectedResponseDto {
    return { message: '認証済み' };
  }
}
