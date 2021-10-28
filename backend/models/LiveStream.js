const Livestream = (sequelize, Sequelize) => {
    const LiveStream = sequelize.define('livestream', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        room: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'livestream',
        indexes: [
            {
                name: 'liveStream_index',
                using: 'HASH',
                fields: ['room', 'name']
            }
        ]
    });
    return LiveStream;
}

export default Livestream;