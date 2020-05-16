const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const POS = sequelize.define('pos', {
        orderId: Sequelize.INTEGER,
        totalSum: Sequelize.INTEGER,
        fiscalNumber: Sequelize.INTEGER,
    }, { freezeTableName: true });

    return POS;
};
