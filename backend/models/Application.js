const Application = (sequelize, Sequelize) => {
  const Application = sequelize.define('application', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    secretKey: {
      type: Sequelize.STRING,
    },
    nameStream: {
      type: Sequelize.STRING,
      defaultValue: 'Stream 1',
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'application',
    indexes: [
      {
        name: 'application_index',
        using:'BTREE',
        fields: ['id'],
      }
    ]
  });
  return Application;
}

export default Application;