const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const POS = sequelize.define('pos', {
        totalSum: Sequelize.INTEGER,
        fiscalNumber: Sequelize.INTEGER,
    }, { freezeTableName: true });

    return POS;
};
