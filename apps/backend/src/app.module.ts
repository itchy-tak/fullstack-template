import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { SafeConfigModule } from './common/config/safe-config.module';
import { SafeConfigService } from './common/config/safe-config.service';
import { InternalSecretGuard } from './common/guards/internal-secret.guard';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthorsModule } from './features/authors/authors.module';
import { PostsModule } from './features/posts/posts.module';

@Module({
  imports: [
    SafeConfigModule,
    PrismaModule,
    AuthorsModule,
    PostsModule,
    JwtModule.registerAsync({
      global: true,
      inject: [SafeConfigService],
      useFactory: (config: SafeConfigService) => ({
        secret: config.appConfig.authSecret,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: InternalSecretGuard }],
})
export class AppModule {}
