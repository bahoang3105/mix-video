import dbConfig from '../config/database';
import Sequelize from 'sequelize';
import Livestream from './LiveStream';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: 0,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.livestream = Livestream(sequelize, Sequelize);

export const init = async () => {
  await db.sequelize.query("CREATE DATABASE IF NOT EXISTS livestream;");
}

export default db;