import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const MigrationsDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrationsTableName: 'migrations',
  migrations: ['/app/dist/migrations/*.js'],
  synchronize: false,
});

MigrationsDataSource.initialize();

export default MigrationsDataSource;
