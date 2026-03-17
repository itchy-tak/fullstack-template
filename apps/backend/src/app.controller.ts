import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { HealthResponseDto, ProtectedResponseDto } from './app.dto';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Controller()
export class AppController {
  @Get('health')
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
