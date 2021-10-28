import dbConfig from '../config/database';
import Sequelize from 'sequelize';
import Livestream from './LiveStream';
import mysql from 'mysql2/promise';

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
	const connection = await mysql.createConnection({
		host: dbConfig.HOST,
		user: dbConfig.USER,
		password: dbConfig.PASSWORD, 
	});
	await connection.query("CREATE DATABASE IF NOT EXISTS livestream;");
	await db.livestream.sequelize.query("DROP TABLE IF EXISTS livestream;");
	await db.sequelize.sync();
}

export default db;