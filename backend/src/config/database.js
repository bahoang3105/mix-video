/**
 * Config sql database
 */

 const configFromEnv = {
    host: process.env.MYSQL_HOST || '172.16.40.60',
    port: process.env.MYSQL_PORT || '3306',
    username: process.env.MYSQL_USERNAME || 'ovp',
    password: process.env.MYSQL_PASSWORD || 'sMsxklK5Upw4wmKsM6u3',
    database: process.env.MYSQL_DB || 'mixVideo',
    replication: {
        read: [{ host: '172.16.40.60' }],
        write: { host: '172.16.40.60' },
    },
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00',
    pool: { max: 30, min: 0, idle: 1000 },
    retry: {
        match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
        ],
    },
};

export default {
	localhost: {
		default: {
			host: process.env.MYSQL_HOST || 'localhost',
			username: 'hoang',
			password: 'hoang3105',
			database: 'mixVideo',
			dialect: 'mysql',
			logging: false,
			timezone: '+07:00',
			pool: { max: 10, min: 0, idle: 1000 },
			retry: {
				match: [
					/SequelizeConnectionError/,
					/SequelizeConnectionRefusedError/,
					/SequelizeHostNotFoundError/,
					/SequelizeHostNotReachableError/,
					/SequelizeInvalidConnectionError/,
					/SequelizeConnectionTimedOutError/
				],
				timeout: 60000,
				max: Infinity
			}
		}
	},
	development: {
		default: {
			host: process.env.MYSQL_HOST || '10.5.44.125',
			port: process.env.MYSQL_PORT || '13306',
			username: 'sohatv',
			password: 'qOz2%fmbrrjqyN#A',
			database: 'mixVideoDev',
			replication: {
				read: [
					{ host: '10.5.44.125' }
				],
				write: { host: '10.5.44.125' }
			},
			dialect: 'mysql',
			logging: true,
			timezone: '+07:00',
			pool: { max: 10, min: 0, idle: 1000 },
			retry: {
				match: [
					/SequelizeConnectionError/,
					/SequelizeConnectionRefusedError/,
					/SequelizeHostNotFoundError/,
					/SequelizeHostNotReachableError/,
					/SequelizeInvalidConnectionError/,
					/SequelizeConnectionTimedOutError/
				],
				timeout: 60000,
				max: Infinity,
			}
		}
	},
	production: {
		default: configFromEnv
	},
};