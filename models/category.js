const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Category = sequelize.define('category', {
        name: Sequelize.STRING,
        description: Sequelize.STRING
    }, { freezeTableName: true });

    return Category;
};
