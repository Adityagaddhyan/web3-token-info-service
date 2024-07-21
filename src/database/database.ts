import { Key } from 'src/entity/key.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'plena',
        logging: 'all',
        entities: [Key],
        logger: 'advanced-console',
      });

      return dataSource.initialize();
    },
  },
];
