import * as dotenv from 'dotenv';
import { DatabaseType } from 'typeorm';

import { EEnvironment } from '@resources';

dotenv.config();

export default () => ({
  nodeEnv: process.env.NODE_ENV as EEnvironment,

  port: +process.env.PORT,

  app: {
    baseUrl: process.env.APP_BASE_URL,
    gatewayBaseUrl: process.env.APP_GATEWAY_BASE_URL,
  },

  database: {
    type: 'postgres' as DatabaseType,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
  },
});
