const Layer = (sequelize, Sequelize) => {
	const Layer = sequelize.define('layer', {
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
			listLayer: {
        type: Sequelize.JSON,
      }
	}, {
			freezeTableName: true,
			timestamps: false,
			tableName: 'layer',
			indexes: [
					{
							name: 'layer_index',
							using: 'HASH',
							fields: ['id'],
					}
			]
	});
	return Layer;
}

export default Layer;