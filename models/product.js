const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        stockQuantity: Sequelize.INTEGER,
        status: Sequelize.STRING,
        description: Sequelize.STRING,
        unitPrice: Sequelize.INTEGER,
        sellingPrice: Sequelize.INTEGER,
        categoryId: Sequelize.INTEGER
     }, { freezeTableName: true });

    return Product;
};