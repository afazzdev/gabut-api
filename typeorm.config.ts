import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { parse } from 'pg-connection-string';
import * as config from 'config';
import { join } from 'path';

const dbConfig = config.get('db');
const parsed = parse(process.env.DATABASE_URL || '');
const prod = process.env.NODE_ENV === 'production';

const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: parsed.host || dbConfig.host,
  port: parseInt(parsed.port) || parseInt(dbConfig.port),
  username: parsed.user || dbConfig.user,
  password: parsed.password || dbConfig.password,
  database: parsed.database || dbConfig.database,
  entities: [join(__dirname + '/**/*.entity.{js,ts}')],
  migrations: [join(__dirname + '/migration/*.ts')],
  cli: {
    migrationsDir: 'migration',
  },
  synchronize: !prod,
  ssl: prod,
};

// this "weird"  syntax is required for migration
// should be able to use module.exports too (not yet tested)
export = typeORMConfig;

//  NOTE: there's some weird thing happens. I can't put this file inside src/. but it's okay.
