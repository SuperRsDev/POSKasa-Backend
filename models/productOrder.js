const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const ProductOrder = sequelize.define('productOrder', {
        orderId: Sequelize.INTEGER,
        productId: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
    }, { freezeTableName: true });

    return ProductOrder;
};
