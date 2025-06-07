import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SafeConfigService } from './safe-config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({})],
  providers: [SafeConfigService],
  exports: [SafeConfigService],
})
export class SafeConfigModule {}
