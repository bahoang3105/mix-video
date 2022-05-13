const RTMP = (sequelize, Sequelize) => {
    const Rtmp = sequelize.define('rtmp', {
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
                name: 'rtmp_index',
                using: 'HASH',
                fields: ['room', 'name']
            }
        ]
    });
    return Rtmp;
}

export default RTMP;