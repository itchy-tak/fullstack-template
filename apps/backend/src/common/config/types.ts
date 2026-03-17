export interface AppConfig {
  port: number;
  databaseUrl: string;
  corsOrigin: string;
  internalSecret: string;
  authSecret: string;
}
