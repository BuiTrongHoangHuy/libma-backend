'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Member extends Model {
        static associate(models) {
            // A member has many loan records
            Member.hasMany(models.LoanRecord, {
                foreignKey: 'member_id',
                as: 'loanRecords',
            });
            // A member can have many notifications
            Member.hasMany(models.Notification, {
                foreignKey: 'member_id',
                as: 'notifications',
            });
        }
    }

    Member.init({
        member_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        account_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
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
        modelName: 'Member',
        tableName: 'Members',
    });
    return Member;
};
