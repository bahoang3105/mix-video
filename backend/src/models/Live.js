const Live = (sequelize, Sequelize) => {
  const Live = sequelize.define('live', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nameStream: {
      type: Sequelize.STRING,
      defaultValue: 'Stream 1',
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'live',
    indexes: [
      {
        name: 'live_index',
        using: 'HASH',
        fields: ['id']
      }
    ]
  });
  return Live;
}

export default Live;