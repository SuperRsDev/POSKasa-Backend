const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const UserRole = sequelize.define('userRole', {
        roleId: Sequelize.INTEGER,
        userId: Sequelize.INTEGER,
    }, { freezeTableName: true });

    return UserRole;
};
