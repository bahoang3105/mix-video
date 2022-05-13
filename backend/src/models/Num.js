const Num = (sequelize, Sequelize) => {
	const Num = sequelize.define('num', {
			id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
			},
			liveId: {
					type: Sequelize.INTEGER,
					references: {
						model: 'live',
						key: 'id',
					}
			},
			layerNum: {
				type: Sequelize.INTEGER
			},
			sceneNum: {
				type: Sequelize.INTEGER,
			},
	}, {
			freezeTableName: true,
			timestamps: false,
			tableName: 'num',
			indexes: [
					{
							name: 'num_index',
							using: 'HASH',
							fields: ['id'],
					}
			]
	});
	return Num;
}

export default Num;