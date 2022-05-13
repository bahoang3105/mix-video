const File = (sequelize, Sequelize) => {
  const File = sequelize.define('file', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    liveId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'live',
        key: 'id'
      }
    },
    fileName: {
      type: Sequelize.STRING,
    },
    fileType: {
      type: Sequelize.STRING,
    },
    fileKey: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    url: {
      type: Sequelize.STRING,
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