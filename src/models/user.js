'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Account, {
                foreignKey: 'account_id',
            })
        }
    }

    User.init({
        user_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        account_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Staff', 'Librarian'),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
    });
    return User;
};
