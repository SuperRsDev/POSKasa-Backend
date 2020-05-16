const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        employeeId: Sequelize.INTEGER,
        paymentTypeId: Sequelize.INTEGER,
        date: Sequelize.DATE,
        status: Sequelize.STRING,
        orderType: Sequelize.STRING
    }, { freezeTableName: true });

    return Order;
};
