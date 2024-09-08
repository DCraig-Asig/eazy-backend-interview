import { DataSource } from 'typeorm';

import getConfig from '@config';
import { Entities } from '@entities';

const databaseConfig = getConfig().database;

const dataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: databaseConfig.synchronize,
  entities: Entities,
});

dataSource.initialize();

export default dataSource;
