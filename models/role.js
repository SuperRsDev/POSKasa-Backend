const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Role = sequelize.define('role', {
        description: Sequelize.STRING,
        name: Sequelize.STRING,
    }, { freezeTableName: true });

    return Role;
};
