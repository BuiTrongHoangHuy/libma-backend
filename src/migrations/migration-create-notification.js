'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notifications', {
            notification_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            member_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                /*references: {
                    model: 'Members',
                    key: 'member_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'*/
            },
            type: {
                type: Sequelize.ENUM('Reminder', 'Available'),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notifications');
    }
};
