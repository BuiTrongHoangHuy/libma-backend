'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notifications', {
            notification_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            reader_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('Reminder', 'Available'),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1,

            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notifications');
    }
};
