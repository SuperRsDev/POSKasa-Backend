const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Role = sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        description: Sequelize.STRING,
        name: Sequelize.STRING,
    }, { freezeTableName: true });

    return Role;
};
