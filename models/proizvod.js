const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Product = sequelize.define('product', {
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