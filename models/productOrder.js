const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const ProductOrder = sequelize.define('productOrder', {
        productId: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
    }, { freezeTableName: true });

    return ProductOrder;
};
