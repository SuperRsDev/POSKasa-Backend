const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Proizvod = sequelize.define('proizvod', {
     }, { freezeTableName: true });

    return Proizvod;
};