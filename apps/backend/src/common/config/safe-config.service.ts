import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from './types';

@Injectable()
export class SafeConfigService {
  constructor(private readonly configService: ConfigService) {}

  private getConfig(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`${key} is required`);
    }
    return value;
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') ?? 'development';
  }

  get isDev(): boolean {
    return this.nodeEnv !== 'production';
  }

  get appConfig(): AppConfig {
    return {
      port: parseInt(this.getConfig('PORT'), 10),
      databaseUrl: this.getConfig('DATABASE_URL'),
    };
  }
}
