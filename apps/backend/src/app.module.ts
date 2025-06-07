import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SafeConfigModule } from './common/config/safe-config.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { PostsModule } from './features/posts/posts.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [SafeConfigModule, PrismaModule, UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
