import { DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger / OpenAPI の共通設定を生成する。
 * main.ts (Swagger UI) と generate-openapi スクリプトの両方で使用する。
 */
export function createSwaggerConfig() {
  return new DocumentBuilder().build();
}
