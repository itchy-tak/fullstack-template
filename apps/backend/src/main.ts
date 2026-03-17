import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SafeConfigService } from './common/config/safe-config.service';
import { createSwaggerConfig } from './common/swagger/swagger.setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = app.get(SafeConfigService);

  app.enableCors({
    origin: config.appConfig.corsOrigin,
    credentials: true,
  });

  // Swagger UI（開発環境のみ）
  if (config.isDev) {
    const swaggerConfig = createSwaggerConfig();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(config.appConfig.port, '0.0.0.0');

  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  if (config.isDev) {
    console.log(`📚 Swagger UI: ${await app.getUrl()}/api`);
  }
}
void bootstrap();
