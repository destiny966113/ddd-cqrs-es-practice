import { createConnection } from 'typeorm';

// ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
export const DatabaseProvider = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'root168141',
                database: 'tmp',
                entities: ['dist/**/**.entity.js'],
                // logging: true,
                synchronize: true
                /*
    dropSchema: true,
    keepConnectionAlive: true,
    retryAttempts: 2,
    retryDelay: 1000,
    */
            })
    }
];
