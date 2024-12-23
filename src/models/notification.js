'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Notification extends Model {
        static associate(models) {
            // A notification belongs to a member
            Notification.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
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
        user_id: {
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
