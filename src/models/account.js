'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Account extends Model {
        static associate(models) {
            // An account has many members
            Account.hasMany(models.Member, {
                foreignKey: 'account_id',
                as: 'members',
            });
            // An account has one admin
            Account.hasOne(models.Admin, {
                foreignKey: 'account_id',
                as: 'admin',
            });
            // An account has one librarian
            Account.hasOne(models.Librarian, {
                foreignKey: 'account_id',
                as: 'librarian',
            });
        }
    }

    Account.init({
        account_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Account',
        tableName: 'Accounts',
    });
    return Account;
};
