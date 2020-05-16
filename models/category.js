const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Category = sequelize.define('category', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING
    }, { freezeTableName: true });

    return Category;
};
