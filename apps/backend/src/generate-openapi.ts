/**
 * OpenAPI spec 生成スクリプト。
 *
 * CLI Plugin の AST 変換が適用された状態で動作させるため、
 * `nest build` でコンパイル後に `node dist/generate-openapi.js` として実行する。
 */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

import { AppModule } from './app.module';
import { createSwaggerConfig } from './common/swagger/swagger.setup';

async function generateOpenApiSpec(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false });

  const swaggerConfig = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const outputPath = path.resolve(
    __dirname,
    '../../../packages/api-types/src/__generated__/openapi.json',
  );
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), 'utf-8');
  console.log(`✅ OpenAPI spec generated: ${outputPath}`);

  await app.close();
}

void generateOpenApiSpec();
