const Scene = (sequelize, Sequelize) => {
	const Scene = sequelize.define('scene', {
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
			listScene: {
        type: Sequelize.JSON,
      }
	}, {
			freezeTableName: true,
			timestamps: false,
			tableName: 'scene',
			indexes: [
					{
							name: 'scene_index',
							using: 'HASH',
							fields: ['id'],
					}
			]
	});
	return Scene;
}

export default Scene;