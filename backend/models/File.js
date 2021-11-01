const File = (sequelize, Sequelize) => {
  const File = sequelize.define('file', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'application',
        key: 'id'
      }
    },
    fileName: {
      type: Sequelize.STRING,
    },
    fileKey: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'file',
    indexes: [
      {
        name: 'file_index',
        using:'BTREE',
        fields: ['id'],
      }
    ]
  });
  return File;
}

export default File;