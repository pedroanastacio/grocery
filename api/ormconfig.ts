export = {
    type: 'postgres',
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    username:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_NAME,
    entities: ['./src/entities/*.{js,ts}'],
    migrations: ['./src/database/migrations/*.{js,ts}'],
    seeds: ['./src/database/seeds/**/*{.ts,.js}'],
    factories: ['./src/database/factories/**/*{.ts,.js}'],
    cli: {
        'entitiesDir': './src/entities',
        'migrationsDir': './src/database/migrations',
    },
    synchronize: false,
    migrationsRun: true,
}