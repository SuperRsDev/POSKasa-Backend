const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const PaymentType = sequelize.define('paymentType', {
        paymentTypeProvider: Sequelize.STRING,
        description: Sequelize.STRING
    }, { freezeTableName: true });

    return PaymentType;
};
