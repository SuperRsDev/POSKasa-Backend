const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const PaymentType = sequelize.define('paymentType', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        paymentTypeProvider: Sequelize.STRING,
        description: Sequelize.STRING
    }, { freezeTableName: true });

    return PaymentType;
};
