const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes){
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        address: Sequelize.STRING,
        picture: {
            type: Sequelize.STRING,
            defaultValue: "@../img/user.png"
        },
        birthDate: Sequelize.DATE,
        loginProvider: {
            type: Sequelize.STRING,
            defaultValue: "local"
        }
    },
    {
        freezeTableName: true
    });

    const encryptPassword = function(user, options) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
    }

    User.beforeCreate(encryptPassword);
    User.beforeUpdate(encryptPassword);

    return User;
};
