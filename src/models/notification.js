'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Notification extends Model {
        static associate(models) {
            // A notification belongs to a member
            Notification.belongsTo(models.Member, {
                foreignKey: 'member_id',
                as: 'member',
            });
        }
    }

    Notification.init({
        notification_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        member_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('Reminder', 'Available'),
            allowNull: false,
        },
        content: {
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
        modelName: 'Notification',
        tableName: 'Notifications',
    });
    return Notification;
};
