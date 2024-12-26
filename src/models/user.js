'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            // define association here
            User.hasMany(models.LoanRecord, {
                foreignKey: 'member_id',
                as: 'loanRecords',
            });
            User.hasMany(models.Notification, {
                foreignKey: 'member_id',
                as: 'notifications',
            });
        }
    }

    User.init({
        user_id: {
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
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Librarian', 'Reader', 'Staff'),
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
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
        modelName: 'User',
        tableName: 'Users',
    });
    return User;
};
