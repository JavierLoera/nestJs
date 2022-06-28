"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_config_1 = require("./database.config");
const task_entity_1 = require("../entity/task.entity");
const user_entity_1 = require("../entity/user.entity");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case 'DEVELOPMENT':
                    config = database_config_1.databaseConfig.development;
                    break;
                case 'TEST':
                    config = database_config_1.databaseConfig.test;
                    break;
                case 'PRODUCTION':
                    config = database_config_1.databaseConfig.test;
                    break;
                default:
                    config = database_config_1.databaseConfig.development;
            }
            config = {
                username: 'root',
                password: '',
                database: 'nest',
                host: 'localhost',
                port: 3306,
                dialect: 'mysql',
            };
            const sequelize = new sequelize_typescript_1.Sequelize(config);
            sequelize.addModels([task_entity_1.Task, user_entity_1.User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.Providers.js.map