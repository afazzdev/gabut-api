import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { parse } from 'pg-connection-string';
import * as config from 'config';
import { join } from 'path';

const dbConfig = config.get('db');
const parsed = parse(process.env.DATABASE_URL || '');
const prod = process.env.NODE_ENV === 'production';

const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: parsed.host || dbConfig.host,
  port: parseInt(parsed.port) || parseInt(dbConfig.port),
  username: parsed.user || dbConfig.user,
  password: parsed.password || dbConfig.password,
  database: parsed.database || dbConfig.database,
  entities: [join(__dirname + '/../../**/*.entity.{js,ts}')],
  migrations: [join(__dirname + '/../migration/*.ts')],
  cli: {
    migrationsDir: join(__dirname + '../migration'),
  },
  synchronize: !prod,
  ssl: prod,
};

export default typeORMConfig;
