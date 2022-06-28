import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { Task } from 'src/entity/task.entity';
import { User } from 'src/entity/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config: object;
      switch (process.env.NODE_ENV) {
        case 'DEVELOPMENT':
          config = databaseConfig.development;
          break;
        case 'TEST':
          config = databaseConfig.test;
          break;
        case 'PRODUCTION':
          config = databaseConfig.test;
          break;
        default:
          config = databaseConfig.development;
      }
      config = {
        username: 'root',
        password: '',
        database: 'nest',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
      };
      const sequelize = new Sequelize(config);
      sequelize.addModels([Task, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
