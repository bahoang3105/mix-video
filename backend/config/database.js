const dbConfig = {
    HOST: 'localhost',
    USER: 'hoang',
    PASSWORD: 'hoang3105',
    DB: 'livestream',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default dbConfig;