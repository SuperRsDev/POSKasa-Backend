const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Order = sequelize.define('order', {
        employeeId: Sequelize.INTEGER,
        paymentTypeId: Sequelize.INTEGER,
        date: Sequelize.DATE,
        status: Sequelize.STRING,
        orderType: Sequelize.STRING
    }, { freezeTableName: true });

    return Order;
};
