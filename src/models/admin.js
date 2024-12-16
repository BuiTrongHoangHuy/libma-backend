'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Admin extends Model {
        static associate(models) {
            // An admin belongs to an account
            Admin.belongsTo(models.Account, {
                foreignKey: 'account_id',
                as: 'account',
            });
        }
    }

    Admin.init({
        admin_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        account_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Admin',
        tableName: 'Admins',
        timestamps: false,
    });
    return Admin;
};
