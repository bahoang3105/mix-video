import dbConfig from '../config/database';
import Sequelize from 'sequelize';
import mysql from 'mysql2/promise';
import RTMP from './RTMP';
import Application from './Application';
import Num from './Num';
import Layer from './Layer';
import Scene from './Scene';
import File from './File';
import Live from './Live';

const NODE_ENV = process.env.NODE_ENV || 'localhost';

const sequelize = new Sequelize({
	...dbConfig[NODE_ENV].default,
	dialectOptions: {
			supportBigNumbers: true,
			bigNumberStrings: true
	},
	logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.live = Live(sequelize, Sequelize);
db.rtmp = RTMP(sequelize, Sequelize);
db.application = Application(sequelize, Sequelize);
db.num = Num(sequelize, Sequelize);
db.layer = Layer(sequelize, Sequelize);
db.scene = Scene(sequelize, Sequelize);
db.file = File(sequelize, Sequelize);

export const init = async () => {
	try {
		const connection = await mysql.createConnection({
			host: dbConfig[NODE_ENV].default.host || '10.5.44.125',
			user: dbConfig[NODE_ENV].default.username,
			password: dbConfig[NODE_ENV].default.password, 
			port: dbConfig[NODE_ENV].default.port || '3306',
		});
		await connection.query("CREATE DATABASE IF NOT EXISTS mixVideo;");
		await db.rtmp.sequelize.query("DROP TABLE IF EXISTS rtmp;");
		await db.sequelize.sync();
	} catch (e) {
		console.error(e)
	}
}

export default db;