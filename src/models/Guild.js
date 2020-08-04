module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guild', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        customCommands: {
            type: DataTypes.STRING,
            defaultValue: '[]'
        }
    }, {
        timestamps: false
    })
}