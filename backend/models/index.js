import dbConfig from '../config/database';
import Sequelize from 'sequelize';
import Livestream from './LiveStream';
import mysql from 'mysql2/promise';
import Application from './Application';
import Num from './Num';
import Layer from './Layer';
import Scene from './Scene';
import File from './File';

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
db.application = Application(sequelize, Sequelize);
db.num = Num(sequelize, Sequelize);
db.layer = Layer(sequelize, Sequelize);
db.scene = Scene(sequelize, Sequelize);
db.file = File(sequelize, Sequelize);

export const init = async () => {
	const connection = await mysql.createConnection({
		host: dbConfig.HOST,
		user: dbConfig.USER,
		password: dbConfig.PASSWORD, 
	});
	await connection.query("CREATE DATABASE IF NOT EXISTS livestream;");
	await db.livestream.sequelize.query("DROP TABLE IF EXISTS livestream;");
	const firstInit = await db.application.findOne({  where: { secretKey: '8ef1522b-0b4c-45e8-b017-1c71ecbd0038' } } );
	if(firstInit === null) {
		await db.application.create({ secretKey: '8ef1522b-0b4c-45e8-b017-1c71ecbd0038' });
	}
	await db.sequelize.sync();
}

export default db;