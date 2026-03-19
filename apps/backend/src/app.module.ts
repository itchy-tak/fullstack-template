import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { SafeConfigModule } from './common/config/safe-config.module';
import { SafeConfigService } from './common/config/safe-config.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { InternalSecretGuard } from './common/guards/internal-secret.guard';
import { AccessLoggerMiddleware } from './common/middleware/access-logger.middleware';
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
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_GUARD, useClass: InternalSecretGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLoggerMiddleware).forRoutes('*path');
  }
}
